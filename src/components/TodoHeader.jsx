import React from 'react';
import { CheckCircle2, Sun, Moon, Calendar, Sparkles } from 'lucide-react';

const TodoHeader = ({ 
  todos, 
  darkMode, 
  toggleDarkMode 
}) => {
  const total = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const progressPercent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  // Format today's date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="todo-header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-icon-wrapper">
            <CheckCircle2 className="brand-icon" size={32} />
          </div>
          <div>
            <h1 className="brand-title">TaskFlow</h1>
            <p className="brand-subtitle">Smart & Minimalist React TODO App</p>
          </div>
        </div>

        <button 
          className="theme-toggle-btn"
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun size={20} className="theme-icon sun" /> : <Moon size={20} className="theme-icon moon" />}
        </button>
      </div>

      <div className="header-meta">
        <div className="date-pill">
          <Calendar size={16} />
          <span>{dateFormatted}</span>
        </div>

        <div className="stats-badge">
          <Sparkles size={16} className="sparkle-icon" />
          <span>
            {completedCount} of {total} completed ({progressPercent}%)
          </span>
        </div>
      </div>

      <div className="progress-container" title={`${progressPercent}% completed`}>
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};

export default TodoHeader;
