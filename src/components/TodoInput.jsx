import React, { useState } from 'react';
import { PlusCircle, Tag, AlertTriangle, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { id: 'work', label: 'Work', color: '#3b82f6' },
  { id: 'personal', label: 'Personal', color: '#8b5cf6' },
  { id: 'study', label: 'Study', color: '#10b981' },
  { id: 'shopping', label: 'Shopping', color: '#f59e0b' },
  { id: 'health', label: 'Health', color: '#ec4899' },
  { id: 'other', label: 'General', color: '#64748b' }
];

const PRIORITIES = [
  { id: 'low', label: 'Low', badgeClass: 'priority-low' },
  { id: 'medium', label: 'Medium', badgeClass: 'priority-medium' },
  { id: 'high', label: 'High', badgeClass: 'priority-high' }
];

const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('work');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a task description before adding!');
      return;
    }

    onAddTodo({
      text: trimmed,
      priority,
      category,
      dueDate: dueDate || null
    });

    setText('');
    setDueDate('');
    setErrorMessage('');
    // Keep user's preferred options open or reset
  };

  return (
    <div className="todo-input-card">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-row">
          <input
            type="text"
            className={`task-main-input ${errorMessage ? 'input-error' : ''}`}
            placeholder="What needs to be done? e.g. Finish report, Buy groceries..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            aria-label="New task description"
          />
          <button 
            type="submit" 
            className="btn btn-primary add-task-btn"
            title="Add task to list"
          >
            <PlusCircle size={20} />
            <span>Add Task</span>
          </button>
        </div>

        {errorMessage && (
          <div className="validation-error">
            <AlertTriangle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="input-options-toggle">
          <button
            type="button"
            className="btn-toggle-options"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span>Task Metadata (Priority, Category, Due Date)</span>
            <ChevronDown size={16} className={`chevron-icon ${showOptions ? 'rotated' : ''}`} />
          </button>
        </div>

        {showOptions && (
          <div className="options-grid">
            <div className="option-group">
              <label className="option-label">
                <Tag size={14} /> Priority:
              </label>
              <div className="priority-selector">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`priority-chip ${p.badgeClass} ${priority === p.id ? 'active' : ''}`}
                    onClick={() => setPriority(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label className="option-label">
                <Tag size={14} /> Category:
              </label>
              <select
                className="select-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="option-group">
              <label className="option-label">
                <CalendarIcon size={14} /> Due Date:
              </label>
              <input
                type="date"
                className="date-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoInput;
export { CATEGORIES, PRIORITIES };
