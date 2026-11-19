import React from 'react';
import { Database, ShieldCheck, ExternalLink } from 'lucide-react';

const TodoFooter = () => {
  return (
    <footer className="todo-footer">
      <div className="footer-status">
        <span className="storage-badge" title="Tasks automatically saved in browser LocalStorage">
          <Database size={13} /> LocalStorage Sync Active
        </span>
        <span className="security-badge">
          <ShieldCheck size={13} /> 100% Client-Side Privacy
        </span>
      </div>

      <p className="footer-note">
        React TODO Application • Case Study 9 • Deployed on GitHub Pages
      </p>

      <div className="footer-links">
        <a 
          href="https://github.com/Saito129/react-todo-app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <span>View Source on GitHub</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </footer>
  );
};

export default TodoFooter;
