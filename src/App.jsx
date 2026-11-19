import React, { useState, useEffect, useMemo } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import TodoFooter from './components/TodoFooter';

const STORAGE_KEY = 'taskflow_todos_v1';
const THEME_KEY = 'taskflow_theme';

const INITIAL_TODOS = [
  {
    id: 'sample-1',
    text: 'Design clean React TODO architecture and components',
    completed: true,
    priority: 'high',
    category: 'work',
    dueDate: '2026-11-19',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'sample-2',
    text: 'Implement Add, Toggle, Edit, and Delete task handlers',
    completed: true,
    priority: 'high',
    category: 'study',
    dueDate: '2026-11-19',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'sample-3',
    text: 'Deploy application live on GitHub Pages for easy sharing',
    completed: false,
    priority: 'high',
    category: 'work',
    dueDate: '2026-11-20',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-4',
    text: 'Test responsive layout across mobile and desktop devices',
    completed: false,
    priority: 'medium',
    category: 'personal',
    dueDate: '2026-11-21',
    createdAt: new Date().toISOString()
  }
];

export function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to root document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Todos state initialized from LocalStorage
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TODOS;
  });

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [todos]);

  // Filter & Search states
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'priority' | 'dueDate' | 'alphabetical'

  // Add task handler
  const handleAddTodo = ({ text, priority, category, dueDate }) => {
    const newTodo = {
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      text,
      completed: false,
      priority,
      category,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  // Toggle complete / uncomplete
  const handleToggleComplete = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete task
  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Update existing task
  const handleUpdateTodo = (id, updatedFields) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Mark all completed
  const handleMarkAllComplete = () => {
    setTodos(prev => prev.map(todo => ({ ...todo, completed: true })));
  };

  // Reset to initial sample tasks
  const handleResetSampleData = () => {
    setTodos(INITIAL_TODOS);
  };

  // Compute filtered & sorted tasks
  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        // Status filter
        if (filterStatus === 'active' && todo.completed) return false;
        if (filterStatus === 'completed' && !todo.completed) return false;

        // Category filter
        if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesText = todo.text.toLowerCase().includes(q);
          const matchesCategory = (todo.category || '').toLowerCase().includes(q);
          if (!matchesText && !matchesCategory) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        }
        if (sortBy === 'priority') {
          const priorityWeights = { high: 3, medium: 2, low: 1 };
          return (priorityWeights[b.priority] || 2) - (priorityWeights[a.priority] || 2);
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'alphabetical') {
          return a.text.localeCompare(b.text);
        }
        return 0;
      });
  }, [todos, filterStatus, categoryFilter, searchQuery, sortBy]);

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="app-layout">
      <main className="todo-container">
        {/* Header Component */}
        <TodoHeader
          todos={todos}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Input Form Component */}
        <TodoInput onAddTodo={handleAddTodo} />

        {/* Filters and Controls Component */}
        <TodoFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          todosCount={todos.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        {/* Task List Component */}
        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
          onUpdateTodo={handleUpdateTodo}
          totalTodosCount={todos.length}
          filterStatus={filterStatus}
          searchQuery={searchQuery}
        />

        {/* Stats and Quick Actions Bar */}
        <TodoStats
          todos={todos}
          onClearCompleted={handleClearCompleted}
          onMarkAllComplete={handleMarkAllComplete}
          onResetSampleData={handleResetSampleData}
        />

        {/* Footer Component */}
        <TodoFooter />
      </main>
    </div>
  );
}

export default App;
