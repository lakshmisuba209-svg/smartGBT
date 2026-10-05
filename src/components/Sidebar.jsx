import React from 'react';
import { Clock3, MessageSquareText, Plus, Search, Settings2, Trash2, X } from 'lucide-react';

function dateLabel(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  return date.toDateString() === now.toDateString()
    ? date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function Sidebar({ chats, activeId, onSelect, onNew, onDelete, onClear, onSettings, search, setSearch, mobileOpen, setMobileOpen, provider }) {
  const visibleChats = chats.filter((chat) => `${chat.title} ${chat.messages.map((message) => message.content).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">S<span>.</span></div>
          <div className="brand-copy"><strong>SmartGBT</strong><span>Your Smart AI Assistant</span></div>
          <button className="mobile-close icon-button" type="button" onClick={() => setMobileOpen(false)} aria-label="Close sidebar"><X size={19} /></button>
        </div>
        <button className="new-chat-button" type="button" onClick={onNew}><Plus size={18} /><span>New Chat</span><kbd>⌘ K</kbd></button>
        <div className="sidebar-section-label"><span>YOUR SPACE</span></div>
        <label className="search-box">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chats..." aria-label="Search conversations" />
          {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}
        </label>
        <div className="history-heading"><span>Recent chats</span>{chats.length > 0 && <span className="history-count">{chats.length}</span>}</div>
        <div className="chat-history">
          {visibleChats.length ? visibleChats.map((chat) => (
            <div key={chat.id} className={`history-item ${activeId === chat.id ? 'history-active' : ''}`}>
              <button type="button" onClick={() => { onSelect(chat.id); setMobileOpen(false); }} title={chat.title}>
                <MessageSquareText size={16} /><span>{chat.title}</span><time>{dateLabel(chat.updatedAt)}</time>
              </button>
              <button className="delete-chat" type="button" aria-label={`Delete ${chat.title}`} onClick={(event) => { event.stopPropagation(); onDelete(chat.id); }}><X size={15} /></button>
            </div>
          )) : <div className="empty-history">{search ? 'No matching conversations' : <>Your conversations will<br />appear here.</>}</div>}
        </div>
        <div className="sidebar-bottom">
          <div className="local-status"><span className="status-dot" /><span>{provider === 'ollama' ? 'Ollama selected' : provider === 'api' ? 'API provider selected' : 'Local mode'}</span><span className="local-status-note">{provider === 'local' ? 'Private by design' : 'Provider requests'}</span></div>
          <button type="button" className="sidebar-action" onClick={onSettings}><Settings2 size={17} /><span>Settings</span></button>
          <button type="button" className="sidebar-action clear-history" onClick={onClear} disabled={!chats.length}><Trash2 size={17} /><span>Clear history</span></button>
          <div className="sidebar-footer"><Clock3 size={14} /> Made for curious minds</div>
        </div>
      </aside>
    </>
  );
}
