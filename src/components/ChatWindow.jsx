import React, { useEffect, useRef } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble.jsx';
import ChatInput from './ChatInput.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';

export default function ChatWindow({ chat, isThinking, onPrompt, onSend, draft, setDraft, enterToSend, onRetry, onMenu, validationMessage, provider }) {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [chat?.messages, isThinking]);
  const messages = chat?.messages || [];
  return (
    <main className="main-panel">
      <header className="topbar">
        <button className="menu-button icon-button" type="button" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
        <div className="topbar-context"><span>SmartGBT</span><span className="topbar-divider">/</span><span>{messages.length ? 'Your conversation' : 'A space to explore'}</span></div>
        <div className="topbar-status"><span className="status-dot" /> Ready to help</div>
      </header>
      <div className={`conversation ${messages.length ? 'conversation-active' : 'conversation-welcome'}`}>
        {!messages.length ? <WelcomeScreen onPrompt={onPrompt} /> : (
          <div className="message-list">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id || `${message.role}-${index}`}
                message={message}
                onRetry={message.role === 'assistant' && index === messages.length - 1 ? onRetry : undefined}
              />
            ))}
            {isThinking && <div className="message-row assistant-row thinking-row"><div className="assistant-avatar">S</div><div className="thinking-content"><div className="assistant-name">SmartGBT</div><div className="thinking-label">SmartGBT is thinking<span className="thinking-dots"><i /><i /><i /></span></div></div><Sparkles size={15} className="thinking-sparkle" /></div>}
            <div ref={endRef} />
          </div>
        )}
      </div>
      <ChatInput value={draft} setValue={setDraft} onSend={onSend} isThinking={isThinking} enterToSend={enterToSend} validationMessage={validationMessage} provider={provider} />
    </main>
  );
}
