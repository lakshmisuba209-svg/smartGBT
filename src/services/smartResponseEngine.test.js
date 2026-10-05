import assert from 'node:assert/strict';
import test from 'node:test';
import { detectIntent, detectTopic, generateResponse, requestResponse } from './smartResponseEngine.js';

test('detects built-in topics from natural question forms', () => {
  assert.equal(detectTopic('Python?')?.name, 'Python');
  assert.equal(detectTopic('What is Java?')?.name, 'Java');
  assert.equal(detectTopic('What is AI?')?.name, 'Artificial Intelligence (AI)');
  assert.equal(detectTopic('What is DBMS?')?.name, 'DBMS');
  assert.equal(detectTopic('How does the internet work?')?.name, 'Computer Networks');
});

test('resolves follow-up pronouns using conversation context', () => {
  const history = [{ role: 'user', content: 'What is Python?' }];
  const response = generateResponse('What are its advantages?', history);
  assert.match(response, /Why Python is useful/);
  assert.match(response, /Some key benefits/);
});

test('detects English and Tamil time, date and day intents', () => {
  for (const question of ['What time is it?', 'What is the current time?', 'Ippo time enna?', 'இப்போ மணி என்ன?']) {
    assert.equal(detectIntent(question), 'time', question);
  }
  for (const question of ["What is today's date?", 'What date is today?', 'இன்னைக்கு என்ன தேதி?']) {
    assert.equal(detectIntent(question), 'date', question);
  }
  for (const question of ['What day is today?', 'Today is which day?', 'இன்னைக்கு என்ன கிழமை?']) {
    assert.equal(detectIntent(question), 'day', question);
  }
});

test('formats clock answers from the current device time', () => {
  const now = new Date();
  const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })
    .format(now)
    .replace(/\b(am|pm)\b/i, (period) => period.toUpperCase());
  const date = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(now);
  const day = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(now);
  assert.ok(generateResponse('What time is it?').includes(time));
  assert.ok(generateResponse("What is today's date?").includes(date));
  assert.ok(generateResponse('What day is today?').includes(day));
  assert.match(generateResponse('இப்போ மணி என்ன?'), /Ippo time/);
});

test('forwards the complete unknown question and history to API mode', async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return new Response(JSON.stringify({ choices: [{ message: { content: 'A dynamic answer.' } }] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  try {
    const settings = {
      provider: 'api',
      apiUrl: 'https://model.example/v1/chat/completions',
      apiKey: 'session-test-key',
      apiModel: 'test-model',
    };
    const history = [{ role: 'user', content: 'How does the internet work?' }];
    for (const question of [
      'Who invented the telephone?',
      'Why is the sky blue?',
      'Explain recursion simply.',
      'Python?',
      'I am feeling stressed.',
    ]) {
      assert.equal(await requestResponse(question, history, settings), 'A dynamic answer.');
    }
    const body = JSON.parse(requests[0].options.body);
    assert.equal(body.messages.at(-1).content, 'Who invented the telephone?');
    assert.equal(body.messages.at(-2).content, 'How does the internet work?');
    assert.equal(requests[0].options.headers.Authorization, 'Bearer session-test-key');
    for (const [index, question] of ['Who invented the telephone?', 'Why is the sky blue?', 'Explain recursion simply.', 'Python?', 'I am feeling stressed.'].entries()) {
      assert.equal(JSON.parse(requests[index].options.body).messages.at(-1).content, question);
    }

    const requestCount = requests.length;
    await requestResponse('What time is it?', [], settings);
    assert.equal(requests.length, requestCount, 'time requests must not call the provider');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('supports Ollama and reports provider, empty answer and empty prompt errors', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    assert.equal(body.stream, false);
    return new Response(JSON.stringify({ message: { content: 'Ollama answer.' } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  try {
    assert.equal(await requestResponse('Explain quantum computing.', [], {
      provider: 'ollama',
      ollamaUrl: 'http://localhost:11434/',
      ollamaModel: 'local-model',
    }), 'Ollama answer.');
    globalThis.fetch = async () => { throw new TypeError('offline'); };
    await assert.rejects(requestResponse('New question', [], {
      provider: 'ollama',
      ollamaUrl: 'http://localhost:11434',
      ollamaModel: 'local-model',
    }), /Ollama could not answer/);
    globalThis.fetch = async () => new Response(JSON.stringify({ choices: [{ message: { content: '  ' } }] }), { status: 200 });
    await assert.rejects(requestResponse('New question', [], {
      provider: 'api',
      apiUrl: 'https://model.example/v1/chat/completions',
      apiKey: 'session-test-key',
      apiModel: 'test-model',
    }), /empty answer/);
    await assert.rejects(requestResponse('  '), /Please enter a question/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
