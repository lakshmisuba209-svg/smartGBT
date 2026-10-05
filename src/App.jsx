import React, { useEffect, useMemo, useState } from 'react';
import { Menu } from 'lucide-react';
import ChatWindow from './components/ChatWindow.jsx';
import Sidebar from './components/Sidebar.jsx';
import Settings from './components/Settings.jsx';
import { requestResponse } from './services/smartResponseEngine.js';
import { loadChats, loadSettings, saveChats, saveSettings } from './utils/storage.js';

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const makeTitle = (text) => text.trim().replace(/\s+/g, ' ').slice(0, 38) + (text.trim().length > 38 ? '…' : '');

export default function App() {
  const [chats, setChats] = useState(loadChats);
  const [activeId, setActiveId] = useState(() => loadChats()[0]?.id || null);
  const [settings, setSettings] = useState(loadSettings);
  const [draft, setDraft] = useState('');
  const [thinkingId, setThinkingId] = useState(null);
  const [search, setSearch] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const activeChat = useMemo(() => chats.find((chat) => chat.id === activeId) || null, [chats, activeId]);
  const isThinking = Boolean(thinkingId && thinkingId === activeId);

  useEffect(() => { saveChats(chats); }, [chats]);
  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => {
    const theme = settings.theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : settings.theme;
    document.documentElement.dataset.theme = theme;
  }, [settings.theme]);
  useEffect(() => {
    if (settings.theme !== 'system') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => { document.documentElement.dataset.theme = media.matches ? 'dark' : 'light'; };
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [settings.theme]);

  const newChat = () => {
    setActiveId(null);
    setDraft('');
    setThinkingId(null);
    setValidationMessage('');
    setMobileOpen(false);
  };
  const deleteChat = (id) => {
    setChats((current) => current.filter((chat) => chat.id !== id));
    if (activeId === id) {
      const next = chats.find((chat) => chat.id !== id);
      setActiveId(next?.id || null);
    }
  };
  const clearHistory = () => {
    setChats([]);
    setActiveId(null);
    setThinkingId(null);
    setValidationMessage('');
  };

  const sendMessage = (text = draft) => {
    const content = text.trim();
    if (!content) {
      setValidationMessage('Please enter a question 😊');
      return;
    }
    if (isThinking) return;
    setValidationMessage('');
    setDraft('');
    const conversation = chats.find((chat) => chat.id === activeId);
    const chatId = conversation?.id || makeId();
    const timestamp = new Date().toISOString();
    const userMessage = { id: makeId(), role: 'user', content, createdAt: timestamp };
    if (!conversation) {
      setActiveId(chatId);
      setChats((current) => [{ id: chatId, title: makeTitle(content), createdAt: timestamp, updatedAt: timestamp, messages: [userMessage] }, ...current]);
    } else {
      setChats((current) => current.map((chat) => chat.id === chatId
        ? { ...chat, updatedAt: timestamp, messages: [...chat.messages, userMessage] }
        : chat));
    }
    setThinkingId(chatId);
    const priorMessages = conversation?.messages || [];
    const respond = async () => {
      try {
        const response = await requestResponse(content, priorMessages, settings);
        setChats((current) => current.map((chat) => chat.id === chatId
          ? { ...chat, updatedAt: new Date().toISOString(), messages: [...chat.messages, { id: makeId(), role: 'assistant', content: response, createdAt: new Date().toISOString() }] }
          : chat));
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'An unexpected response error occurred.';
        setChats((current) => current.map((chat) => chat.id === chatId
          ? { ...chat, updatedAt: new Date().toISOString(), messages: [...chat.messages, { id: makeId(), role: 'assistant', content: `⚠️ **I couldn't get an answer.**\n\n${detail}`, createdAt: new Date().toISOString() }] }
          : chat));
      } finally {
        setThinkingId((current) => current === chatId ? null : current);
      }
    };
    window.setTimeout(respond, settings.provider === 'local' ? 420 : 0);
  };

  const retryLast = () => {
    if (!activeChat || isThinking) return;
    const lastUser = [...activeChat.messages].reverse().find((message) => message.role === 'user');
    if (!lastUser) return;
    const messagesBeforeQuestion = activeChat.messages.slice(0, activeChat.messages.findIndex((message) => message.id === lastUser.id));
    const content = lastUser.content;
    const lastUserIndex = activeChat.messages.findIndex((message) => message.id === lastUser.id);
    setChats((current) => current.map((chat) => chat.id === activeId
      ? { ...chat, messages: chat.messages.slice(0, lastUserIndex + 1), updatedAt: new Date().toISOString() }
      : chat));
    setThinkingId(activeId);
    const chatId = activeId;
    const respond = async () => {
      try {
        const response = await requestResponse(content, messagesBeforeQuestion, settings);
        setChats((current) => current.map((chat) => chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { id: makeId(), role: 'assistant', content: response, createdAt: new Date().toISOString() }], updatedAt: new Date().toISOString() }
          : chat));
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'An unexpected response error occurred.';
        setChats((current) => current.map((chat) => chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { id: makeId(), role: 'assistant', content: `⚠️ **I couldn't get an answer.**\n\n${detail}`, createdAt: new Date().toISOString() }], updatedAt: new Date().toISOString() }
          : chat));
      } finally {
        setThinkingId((current) => current === chatId ? null : current);
      }
    };
    window.setTimeout(respond, settings.provider === 'local' ? 420 : 0);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); newChat(); }
      if (event.key === 'Escape') { setSettingsOpen(false); setMobileOpen(false); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="app-shell">
      <Sidebar
        chats={chats} activeId={activeId} onSelect={setActiveId} onNew={newChat}
        onDelete={deleteChat} onClear={clearHistory} onSettings={() => setSettingsOpen(true)}
        search={search} setSearch={setSearch} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} provider={settings.provider}
      />
      {!mobileOpen && <button className="mobile-brand-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={19} /></button>}
      <ChatWindow
        chat={activeChat} isThinking={isThinking} onPrompt={(prompt) => sendMessage(prompt)}
        onSend={() => sendMessage()} draft={draft} setDraft={setDraft}
        enterToSend={settings.enterToSend} onRetry={retryLast} onMenu={() => setMobileOpen(true)} validationMessage={validationMessage} provider={settings.provider}
      />
      {settingsOpen && <Settings settings={settings} onChange={setSettings} onClear={clearHistory} onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
