import React from 'react';
import { X } from 'lucide-react';

export default function Settings({ settings, onChange, onClear, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <header className="settings-header"><div><span className="panel-eyebrow">PERSONALIZE</span><h2 id="settings-title">Settings</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close settings"><X size={20} /></button></header>
        <div className="settings-body">
          <div className="setting-group">
            <div className="setting-label">Response provider</div>
            <p>Choose local answers or connect your own language model. Time, date and weekday answers always use your device clock.</p>
            <label className="provider-field">
              <span>Provider</span>
              <select value={settings.provider || 'local'} onChange={(event) => onChange({ ...settings, provider: event.target.value })}>
                <option value="local">Local SmartGBT</option>
                <option value="ollama">Ollama</option>
                <option value="api">API-compatible model</option>
              </select>
            </label>
            {settings.provider === 'ollama' && (
              <div className="provider-fields">
                <label className="provider-field"><span>Ollama address</span><input value={settings.ollamaUrl || ''} onChange={(event) => onChange({ ...settings, ollamaUrl: event.target.value })} placeholder="http://localhost:11434" /></label>
                <label className="provider-field"><span>Model name</span><input value={settings.ollamaModel || ''} onChange={(event) => onChange({ ...settings, ollamaModel: event.target.value })} placeholder="llama3.2" /></label>
                <small className="provider-help">The Ollama server must be running locally and allow requests from this page.</small>
              </div>
            )}
            {settings.provider === 'api' && (
              <div className="provider-fields">
                <label className="provider-field"><span>Chat completions endpoint</span><input type="url" value={settings.apiUrl || ''} onChange={(event) => onChange({ ...settings, apiUrl: event.target.value })} placeholder="https://your-provider.example/v1/chat/completions" /></label>
                <label className="provider-field"><span>Model name</span><input value={settings.apiModel || ''} onChange={(event) => onChange({ ...settings, apiModel: event.target.value })} placeholder="your-model-name" /></label>
                <label className="provider-field"><span>API key</span><input type="password" autoComplete="off" value={settings.apiKey || ''} onChange={(event) => onChange({ ...settings, apiKey: event.target.value })} placeholder="Enter your API key" /></label>
                <small className="provider-help">Uses a chat-completions-compatible endpoint. The key stays in memory and is not saved in browser storage.</small>
              </div>
            )}
          </div>
          <div className="setting-group">
            <div className="setting-label">Appearance</div>
            <p>Choose a look that feels right to you.</p>
            <div className="theme-options">
              {['light', 'dark', 'system'].map((theme) => <button key={theme} type="button" onClick={() => onChange({ ...settings, theme })} className={settings.theme === theme ? 'theme-selected' : ''} aria-pressed={settings.theme === theme}><span className={`theme-preview theme-${theme}`} /><span>{theme[0].toUpperCase() + theme.slice(1)}</span></button>)}
            </div>
          </div>
          <div className="setting-group">
            <div className="setting-label">Chat</div>
            <label className="toggle-setting"><span><strong>Enter to send</strong><small>Shift + Enter always adds a new line.</small></span><input type="checkbox" checked={settings.enterToSend} onChange={(event) => onChange({ ...settings, enterToSend: event.target.checked })} /><span className="toggle-track" /></label>
            <button type="button" className="settings-clear-button" onClick={() => { onClear(); onClose(); }}>Clear chat history</button>
          </div>
          <div className="setting-group about-group">
            <div className="setting-label">About</div>
            <div className="about-card"><div className="brand-mark">S<span>.</span></div><div><strong>SmartGBT</strong><span>Your Smart AI Assistant</span></div></div>
            <p>SmartGBT is a standalone AI chatbot prototype designed for learning and demonstration.</p>
            <div className="about-local"><span className="status-dot" /> No external AI service required</div>
          </div>
        </div>
      </section>
    </div>
  );
}
