import React from 'react';
import { CheckCheck, Trash2, RotateCcw } from 'lucide-react';

const TodoStats = ({
  todos,
  onClearCompleted,
  onMarkAllComplete,
  onResetSampleData
}) => {
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  if (totalCount === 0) {
    return (
      <div className="todo-stats-bar empty">
        <button
          type="button"
          className="btn-text-action"
          onClick={onResetSampleData}
        >
          <RotateCcw size={14} /> Load Sample Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="todo-stats-bar">
      <div className="stats-text">
        <span className="remaining-count">
          <strong>{activeCount}</strong> {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>

      <div className="stats-actions">
        {activeCount > 0 && (
          <button
            type="button"
            className="btn-text-action mark-all-btn"
            onClick={onMarkAllComplete}
            title="Mark all tasks as completed"
          >
            <CheckCheck size={16} /> Mark All Done
          </button>
        )}

        {completedCount > 0 && (
          <button
            type="button"
            className="btn-text-action clear-completed-btn"
            onClick={onClearCompleted}
            title="Delete all completed tasks"
          >
            <Trash2 size={16} /> Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoStats;
