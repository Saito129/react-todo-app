import React, { useState } from 'react';
import { 
  Check, 
  Trash2, 
  Edit3, 
  CheckSquare, 
  Square, 
  Calendar, 
  Clock, 
  X, 
  Save, 
  Tag 
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from './TodoInput';

const TodoItem = ({ 
  todo, 
  onToggleComplete, 
  onDeleteTodo, 
  onUpdateTodo 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const [editCategory, setEditCategory] = useState(todo.category || 'work');
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onUpdateTodo(todo.id, {
      text: trimmed,
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate || null
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority || 'medium');
    setEditCategory(todo.category || 'work');
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const categoryObj = CATEGORIES.find(c => c.id === todo.category) || { label: 'General', color: '#64748b' };

  // Calculate due date status
  const getDueDateStatus = (dateStr) => {
    if (!dateStr) return null;
    const due = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Overdue', className: 'due-overdue' };
    if (diffDays === 0) return { label: 'Due Today', className: 'due-today' };
    if (diffDays === 1) return { label: 'Due Tomorrow', className: 'due-soon' };
    return { label: `Due in ${diffDays}d`, className: 'due-future' };
  };

  const dueStatus = getDueDateStatus(todo.dueDate);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div className="todo-edit-mode">
          <input
            type="text"
            className="edit-text-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />

          <div className="edit-controls-row">
            <div className="edit-options">
              <select
                className="edit-select"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                {PRIORITIES.map(p => (
                  <option key={p.id} value={p.id}>{p.label} Priority</option>
                ))}
              </select>

              <select
                className="edit-select"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>

              <input
                type="date"
                className="edit-date-input"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>

            <div className="edit-actions">
              <button
                type="button"
                className="btn-icon btn-save"
                onClick={handleSave}
                title="Save changes"
              >
                <Save size={16} /> Save
              </button>
              <button
                type="button"
                className="btn-icon btn-cancel"
                onClick={handleCancel}
                title="Cancel editing"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="todo-item-content">
          <button
            type="button"
            className="todo-toggle-btn"
            onClick={() => onToggleComplete(todo.id)}
            title={todo.completed ? "Mark as uncompleted" : "Mark as completed"}
            aria-label={todo.completed ? "Mark as uncompleted" : "Mark as completed"}
          >
            {todo.completed ? (
              <span className="checkbox-custom checked">
                <Check size={16} className="check-icon" />
              </span>
            ) : (
              <span className="checkbox-custom unchecked" />
            )}
          </button>

          <div className="todo-text-wrap" onClick={() => onToggleComplete(todo.id)}>
            <span className={`todo-text ${todo.completed ? 'strikethrough' : ''}`}>
              {todo.text}
            </span>

            <div className="todo-badges">
              {/* Priority badge */}
              <span className={`badge-pill badge-priority-${todo.priority || 'medium'}`}>
                {todo.priority ? todo.priority.toUpperCase() : 'MEDIUM'}
              </span>

              {/* Category pill */}
              <span 
                className="badge-pill badge-category"
                style={{ borderColor: categoryObj.color, color: categoryObj.color }}
              >
                <Tag size={10} style={{ marginRight: '4px' }} />
                {categoryObj.label}
              </span>

              {/* Due date tag */}
              {todo.dueDate && (
                <span className={`badge-pill badge-due ${dueStatus?.className}`}>
                  <Calendar size={11} style={{ marginRight: '4px' }} />
                  {todo.dueDate} {dueStatus ? `(${dueStatus.label})` : ''}
                </span>
              )}

              {/* Created timestamp */}
              {todo.createdAt && (
                <span className="todo-timestamp" title={`Created at ${todo.createdAt}`}>
                  <Clock size={11} style={{ marginRight: '3px' }} />
                  {new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>

          <div className="todo-actions">
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
              aria-label="Edit task"
            >
              <Edit3 size={17} />
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => onDeleteTodo(todo.id)}
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
