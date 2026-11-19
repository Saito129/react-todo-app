import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { CATEGORIES } from './TodoInput';

const TodoFilter = ({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  todosCount,
  activeCount,
  completedCount
}) => {
  return (
    <div className="todo-filter-container">
      {/* Search Bar & Secondary Filters */}
      <div className="filter-controls-top">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="dropdowns-group">
          {/* Category Filter */}
          <div className="filter-select-wrapper">
            <Filter size={15} className="select-icon" />
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              title="Filter by category"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-select-wrapper">
            <ArrowUpDown size={15} className="select-icon" />
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              title="Sort tasks"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority (High to Low)</option>
              <option value="dueDate">Due Date</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs (All / Active / Completed) */}
      <div className="filter-tabs">
        <button
          type="button"
          className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          <span>All Tasks</span>
          <span className="tab-badge">{todosCount}</span>
        </button>

        <button
          type="button"
          className={`filter-tab ${filterStatus === 'active' ? 'active' : ''}`}
          onClick={() => setFilterStatus('active')}
        >
          <span>Active</span>
          <span className="tab-badge active-badge">{activeCount}</span>
        </button>

        <button
          type="button"
          className={`filter-tab ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('completed')}
        >
          <span>Completed</span>
          <span className="tab-badge completed-badge">{completedCount}</span>
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
