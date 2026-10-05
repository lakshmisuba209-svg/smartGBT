# SmartGBT

**Your Smart AI Assistant**

SmartGBT is a local-first chatbot prototype for learning and demonstration. It works in Local SmartGBT mode without an external AI service, and optionally supports a user-configured local Ollama server or chat-completions-compatible API for open-ended questions.

## Features

- Local response engine with intent detection, topic detection, conversation context and built-in explanations.
- Optional Ollama and API-compatible model providers for general questions beyond the local knowledge base.
- Time, date and weekday answers based on the device's current clock and locale. English and common Tamil/Tanglish phrasing are supported.
- Knowledge for Python, Java, C, C++, HTML, CSS, JavaScript, SQL, databases/DBMS, data structures, algorithms, operating systems, networks, AI, machine learning, cloud computing, cybersecurity and software engineering.
- Basic arithmetic, simple English-to-Tamil phrase translations, project ideas, career guidance, code examples and follow-up answers.
- Persistent chat history in browser `localStorage`, including conversation titles and timestamps.
- Search, new chat, delete chat, clear history, retry and copy-response controls.
- Light, dark and system appearance modes; configurable Enter-to-send behavior.
- Responsive desktop and mobile layout, suggestion prompts, formatted messages, and a local thinking indicator.

## Technologies

- React 18
- Vite
- JavaScript (ES modules)
- CSS
- Browser `localStorage`

The default Local SmartGBT provider makes no API or external AI calls. Ollama/API requests are sent only when the user explicitly selects and configures that provider in Settings. API keys are held in memory for the current page session and are not persisted to browser storage.

## Install

Install Node.js (18 or later recommended), then from the project directory run:

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the local address printed by Vite (usually `http://localhost:5173`). For a production build:

```bash
npm run build
npm run preview
```

Run the response-engine tests with:

```bash
npm test
```

## Project structure

```text
src/
  components/
    ChatInput.jsx
    ChatWindow.jsx
    MessageBubble.jsx
    Settings.jsx
    Sidebar.jsx
    WelcomeScreen.jsx
  services/
    smartResponseEngine.js
    smartResponseEngine.test.js
  utils/
    storage.js
  App.jsx
  main.jsx
  styles.css
index.html
```

## How the Smart Response Engine works

`src/services/smartResponseEngine.js` contains an in-memory topic knowledge base, topic aliases, intent rules, lightweight context resolution, and response templates. `requestResponse(question, messages, settings)` first handles time/date/day locally using the device clock. Otherwise it dispatches the complete question and conversation history to the selected Ollama or API-compatible provider, or uses the local response engine. Provider failures and empty model responses are shown clearly in the conversation.

Time, date and weekday intents take precedence over topic answers. Each request reads `new Date()` at answer-generation time and formats the result through `Intl.DateTimeFormat`, which uses the current device time zone and locale. It does not use a stored or hardcoded clock value.

The local engine is rule- and template-based, not a generative language model; unsupported questions in Local SmartGBT mode receive a helpful prompt. Choose a configured model provider in Settings for general-purpose answers to new topics.

### Configure a provider

- **Local SmartGBT** works immediately, offline, using the built-in knowledge and response rules.
- **Ollama** expects a running local Ollama server, an installed model, and browser access enabled by the local server. Configure its address and model in Settings.
- **API-compatible model** expects a chat-completions-compatible URL, model name and API key. Configure these in Settings. The API key is not persisted but is sent to the endpoint you configure.

## Add a topic

1. Add a knowledge entry to the `knowledge` object in `src/services/smartResponseEngine.js`. Include its display name, category, definition, beginner-friendly explanation, common uses, a short example and a useful reason to learn it.
2. Add its normalized key and common spellings to `aliases`.
3. If code is relevant, use a key that can be used as a code-fence language and provide a concise example.

Topic detection sorts aliases by length so multiword terms (such as “machine learning”) are checked before short aliases.

## Add an intent

1. Add a rule to `detectIntent()` in `src/services/smartResponseEngine.js`. Put specific intents before broad fallback intents.
2. Add its response branch in `generateResponse()`, ideally before the topic explanation fallback when it should apply across topics.
3. Add any focused parsing in a helper near the other engine helpers.

For date/time-related responses, continue to use the device's current `Date` and `Intl.DateTimeFormat`; do not introduce a static value or external clock service.

## Customize SmartGBT

- Edit `src/styles.css` to adjust colors, typography, spacing and responsive breakpoints.
- Edit `src/components/WelcomeScreen.jsx` to add or change suggestion prompts.
- Edit `src/components/Settings.jsx` and `src/utils/storage.js` to extend appearance or chat preferences.
- Conversation and preference keys are prefixed with `smartgbt-` in localStorage. Data remains in the current browser profile unless the user clears it.
