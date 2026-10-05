const CHATS_KEY = 'smartgbt-conversations';
const SETTINGS_KEY = 'smartgbt-settings';

export function loadChats() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CHATS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Could not load saved conversations.', error);
    return [];
  }
}

export function saveChats(chats) {
  try {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Could not save conversations.', error);
  }
}

export function loadSettings() {
  try {
    return {
      theme: 'system',
      enterToSend: true,
      provider: 'local',
      ollamaUrl: 'http://localhost:11434',
      ollamaModel: 'llama3.2',
      apiUrl: '',
      apiKey: '',
      apiModel: '',
      ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'),
    };
  } catch (error) {
    console.error('Could not load saved settings.', error);
    return { theme: 'system', enterToSend: true, provider: 'local', ollamaUrl: 'http://localhost:11434', ollamaModel: 'llama3.2', apiUrl: '', apiKey: '', apiModel: '' };
  }
}

export function saveSettings(settings) {
  try {
    const { apiKey, ...safeSettings } = settings;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(safeSettings));
  } catch (error) {
    console.error('Could not save settings.', error);
  }
}
