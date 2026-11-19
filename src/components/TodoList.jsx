import React from 'react';
import { CheckCircle2, ClipboardList, SearchX, Sparkles } from 'lucide-react';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
  totalTodosCount,
  filterStatus,
  searchQuery
}) => {
  if (totalTodosCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon-wrap">
          <ClipboardList size={48} className="empty-icon" />
        </div>
        <h3 className="empty-title">Your task list is empty</h3>
        <p className="empty-desc">
          Add your first task above to start organizing your day efficiently!
        </p>
      </div>
    );
  }

  if (todos.length === 0) {
    if (searchQuery) {
      return (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <SearchX size={48} className="empty-icon" />
          </div>
          <h3 className="empty-title">No matching tasks found</h3>
          <p className="empty-desc">
            No tasks match "{searchQuery}". Try searching for something else or clearing filters.
          </p>
        </div>
      );
    }

    if (filterStatus === 'completed') {
      return (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <CheckCircle2 size={48} className="empty-icon" />
          </div>
          <h3 className="empty-title">No completed tasks yet</h3>
          <p className="empty-desc">
            Check off some tasks from your Active list to see your accomplishments here!
          </p>
        </div>
      );
    }

    if (filterStatus === 'active') {
      return (
        <div className="empty-state">
          <div className="empty-icon-wrap accent">
            <Sparkles size={48} className="empty-icon" />
          </div>
          <h3 className="empty-title">All tasks completed!</h3>
          <p className="empty-desc">
            Fantastic work! You have cleared all your active tasks. Relax or add a new goal!
          </p>
        </div>
      );
    }
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
