import React from 'react';
import { CheckCircle2, Sun, Moon, Calendar, Sparkles, Palette } from 'lucide-react';

const PALETTES = [
  { id: 'emerald', label: 'Emerald Green', color: '#10b981' },
  { id: 'ocean', label: 'Ocean Blue', color: '#0284c7' },
  { id: 'sunset', label: 'Sunset Coral', color: '#e11d48' },
  { id: 'violet', label: 'Aurora Violet', color: '#7c3aed' },
  { id: 'midnight', label: 'Midnight Slate', color: '#0f172a' }
];

const TodoHeader = ({ 
  todos, 
  darkMode, 
  toggleDarkMode,
  currentPalette,
  onChangePalette
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
            <CheckCircle2 className="brand-icon" size={30} />
          </div>
          <div>
            <h1 className="brand-title">TaskFlow</h1>
            <p className="brand-subtitle">Smart & Modern React TODO App</p>
          </div>
        </div>

        <div className="header-controls">
          {/* Color Palette Switcher */}
          <div className="palette-picker" title="Choose accent color theme">
            <Palette size={15} style={{ opacity: 0.65, marginRight: '2px' }} />
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`palette-dot ${currentPalette === p.id ? 'active' : ''}`}
                style={{ backgroundColor: p.color }}
                onClick={() => onChangePalette(p.id)}
                title={`${p.label} theme`}
                aria-label={`Switch to ${p.label} theme`}
              />
            ))}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button 
            type="button"
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={19} className="theme-icon sun" /> : <Moon size={19} className="theme-icon moon" />}
          </button>
        </div>
      </div>

      <div className="header-meta">
        <div className="date-pill">
          <Calendar size={15} />
          <span>{dateFormatted}</span>
        </div>

        <div className="stats-badge">
          <Sparkles size={15} className="sparkle-icon" />
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
export { PALETTES };
