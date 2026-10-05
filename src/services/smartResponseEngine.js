const knowledge = {
  python: {
    name: 'Python', category: 'Programming language',
    definition: 'Python is a high-level, general-purpose programming language known for readable syntax and a large ecosystem of libraries.',
    simple: 'Python is a way to give instructions to a computer. Its code is designed to look readable, so it is a friendly first language.',
    uses: ['Web applications and automation', 'Data analysis, machine learning and AI', 'Scripting, education and scientific computing'],
    example: 'print("Hello, world!")',
    why: 'Python is popular because it is readable, quick to write, supported by a large community, and has libraries for many fields.',
  },
  java: {
    name: 'Java', category: 'Programming language',
    definition: 'Java is a class-based, object-oriented programming language that runs on the Java Virtual Machine (JVM).',
    simple: 'Java lets you write a program once and run it on systems with a compatible JVM. It is widely used for large applications.',
    uses: ['Enterprise and backend software', 'Android development', 'Distributed systems and teaching object-oriented programming'],
    example: 'public class Main {\\n  public static void main(String[] args) {\\n    System.out.println("Hello, world!");\\n  }\\n}',
    why: 'Java is valued for its portability, mature ecosystem, strong tooling and broad use in large-scale systems.',
  },
  c: {
    name: 'C', category: 'Programming language',
    definition: 'C is a procedural, compiled language that provides low-level control over memory and hardware.',
    simple: 'C is a compact language that lets programmers work close to how a computer operates, while still using readable instructions.',
    uses: ['Operating systems and embedded devices', 'Compilers and system utilities', 'Performance-sensitive software'],
    example: '#include <stdio.h>\\nint main(void) {\\n  printf("Hello, world!\\\\n");\\n  return 0;\\n}',
    why: 'C remains important because it is fast, portable, and gives precise control over system resources.',
  },
  'c++': {
    name: 'C++', category: 'Programming language',
    definition: 'C++ is a compiled, high-performance language that builds on C and adds features such as classes, templates and generic programming.',
    simple: 'C++ is used when software needs speed and detailed control, while also offering tools for organizing large programs.',
    uses: ['Game engines and graphics', 'Systems and desktop applications', 'Real-time and performance-critical software'],
    example: '#include <iostream>\\nint main() {\\n  std::cout << "Hello, world!\\\\n";\\n}',
    why: 'C++ combines high performance with abstractions that help manage complex software.',
  },
  html: {
    name: 'HTML', category: 'Markup language',
    definition: 'HTML (HyperText Markup Language) describes the structure and meaning of content on web pages using elements and tags.',
    simple: 'HTML is the skeleton of a web page. It tells the browser which parts are headings, paragraphs, links, images and forms.',
    uses: ['Structuring web page content', 'Creating links, forms and accessible page landmarks', 'Working with CSS and JavaScript in web apps'],
    example: '<h1>Hello, web!</h1>\\n<p>This is a paragraph.</p>',
    why: 'HTML is the standard foundation of the web and works in every modern browser.',
  },
  css: {
    name: 'CSS', category: 'Style sheet language',
    definition: 'CSS (Cascading Style Sheets) controls the presentation and layout of HTML documents.',
    simple: 'CSS is how you style a web page: it controls colors, spacing, typography, layout and how the page adapts to different screens.',
    uses: ['Responsive layouts', 'Colors, typography and visual themes', 'Transitions and interface animations'],
    example: 'h1 {\\n  color: #6558d3;\\n  font-size: 2rem;\\n}',
    why: 'CSS separates visual design from page structure and makes responsive, consistent interfaces possible.',
  },
  javascript: {
    name: 'JavaScript', category: 'Programming language',
    definition: 'JavaScript is a dynamic programming language used to make web pages interactive and to build applications across many platforms.',
    simple: 'JavaScript adds behavior to a web page—for example, responding to a click, validating a form or updating content.',
    uses: ['Interactive websites and browser apps', 'Servers and APIs with JavaScript runtimes', 'Mobile and desktop application development'],
    example: 'const greet = (name) => `Hello, ${name}!`;\\nconsole.log(greet("Sam"));',
    why: 'JavaScript runs natively in browsers and has a broad ecosystem spanning front end, back end and tooling.',
  },
  sql: {
    name: 'SQL', category: 'Query language',
    definition: 'SQL (Structured Query Language) is used to define, query and modify data in relational database systems.',
    simple: 'SQL is a language for asking a relational database to find, add, change or organize information.',
    uses: ['Filtering and reporting on data', 'Creating tables and relationships', 'Adding, updating and deleting records'],
    example: 'SELECT name, email\\nFROM customers\\nWHERE active = true;',
    why: 'SQL provides a widely supported, expressive way to work with structured data.',
  },
  dbms: {
    name: 'DBMS', category: 'Database systems',
    definition: 'A DBMS (Database Management System) is software that stores, organizes and provides controlled access to data.',
    simple: 'A DBMS is like an organized digital filing system. It helps people and programs store information, find it again and keep it consistent.',
    uses: ['Storing and retrieving records', 'Managing permissions and concurrent access', 'Backups, transactions and data integrity'],
    example: 'Examples include relational systems that use tables and SQL, as well as document-oriented databases.',
    why: 'A DBMS reduces data duplication and offers tools for safe, reliable access to shared information.',
  },
  database: {
    name: 'Database', category: 'Data storage',
    definition: 'A database is an organized collection of information that can be stored, searched, updated and managed efficiently.',
    simple: 'A database is a structured place to keep information—like a searchable, reliable digital filing cabinet.',
    uses: ['Customer and product records', 'App settings and transactions', 'Research, analytics and reporting'],
    example: 'A school database might keep related tables for students, courses and enrollments.',
    why: 'Databases make it practical to manage large amounts of information and retrieve the right data when needed.',
  },
  datastructures: {
    name: 'Data Structures', category: 'Computer science',
    definition: 'Data structures are ways to organize data so a program can access and modify it efficiently.',
    simple: 'A data structure is a chosen arrangement for information. Like choosing a list, stack or dictionary changes how easily you can find or update an item.',
    uses: ['Arrays and linked lists for sequences', 'Stacks and queues for ordered processing', 'Trees, graphs and hash maps for relationships and fast lookup'],
    example: 'A queue follows first-in, first-out order, like people waiting in a line.',
    why: 'Choosing a suitable structure can make a program simpler and dramatically improve its performance.',
  },
  algorithms: {
    name: 'Algorithms', category: 'Computer science',
    definition: 'An algorithm is a finite, well-defined sequence of steps for solving a problem or completing a computation.',
    simple: 'An algorithm is a recipe: clear steps that take some input and produce a result.',
    uses: ['Sorting and searching', 'Planning routes and schedules', 'Processing data and solving optimization problems'],
    example: 'A basic search checks items one by one until it finds the requested value or reaches the end.',
    why: 'Good algorithms solve problems correctly and use time and memory efficiently.',
  },
  os: {
    name: 'Operating System', category: 'Computer science',
    definition: 'An operating system (OS) manages a computer’s hardware and provides services and interfaces for applications and users.',
    simple: 'An operating system is the main software manager of a device. It coordinates apps, memory, files and hardware such as the keyboard and screen.',
    uses: ['Managing processes and memory', 'Organizing files and devices', 'Providing security and user interfaces'],
    example: 'Windows, macOS, Linux, Android and iOS are operating systems.',
    why: 'An OS lets applications share hardware safely and gives users a consistent way to operate a device.',
  },
  networks: {
    name: 'Computer Networks', category: 'Computer science',
    definition: 'A computer network is a group of connected devices that exchange data and share resources using agreed communication protocols.',
    simple: 'A network lets computers communicate. Devices send data in pieces using shared rules, whether across a room or around the world.',
    uses: ['Sharing files and printers', 'Connecting to websites and cloud services', 'Enabling messaging and video calls'],
    example: 'The internet is a global network of interconnected networks.',
    why: 'Networks make communication, collaboration and shared computing resources possible.',
  },
  ai: {
    name: 'Artificial Intelligence (AI)', category: 'Computer science',
    definition: 'Artificial intelligence is a field of computing that builds systems able to perform tasks that typically require capabilities such as perception, language understanding or decision-making.',
    simple: 'AI is software designed to do tasks that seem intelligent, such as recognizing speech, finding patterns or helping answer questions.',
    uses: ['Speech and image recognition', 'Recommendations and forecasting', 'Language tools and robotics'],
    example: 'A spam filter learns patterns in messages and estimates which ones are unwanted.',
    why: 'AI can help automate complex pattern-based tasks, but its results should be checked for accuracy and bias.',
  },
  ml: {
    name: 'Machine Learning', category: 'Artificial intelligence',
    definition: 'Machine learning is a branch of AI in which models learn patterns from example data to make predictions or decisions.',
    simple: 'Instead of writing every rule by hand, you give a machine-learning system examples so it can learn patterns and make educated guesses.',
    uses: ['Classifying messages or images', 'Forecasting trends', 'Personalized recommendations'],
    example: 'A model can learn from labeled photos to classify new photos as containing a cat or not.',
    why: 'Machine learning is useful when patterns are difficult to describe with fixed rules, provided the data and evaluation are appropriate.',
  },
  cloud: {
    name: 'Cloud Computing', category: 'Computer science',
    definition: 'Cloud computing provides computing resources—such as storage, servers and software—over a network on demand.',
    simple: 'Cloud computing means using computing resources hosted elsewhere and accessed over the internet, rather than managing every machine yourself.',
    uses: ['Hosting websites and applications', 'Online storage and backup', 'Scaling compute for changing workloads'],
    example: 'A team can host an application on rented cloud servers and increase capacity when demand grows.',
    why: 'Cloud services can make infrastructure easier to provision and scale, though they still require cost and security management.',
  },
  cybersecurity: {
    name: 'Cybersecurity', category: 'Computer science',
    definition: 'Cybersecurity is the practice of protecting systems, networks and data from unauthorized access, disruption and misuse.',
    simple: 'Cybersecurity is the set of habits and technologies used to keep devices and information safe.',
    uses: ['Strong unique passwords and multi-factor authentication', 'Updates, backups and access controls', 'Monitoring and responding to threats'],
    example: 'A password manager can help create unique passwords so one leaked password does not unlock every account.',
    why: 'Security reduces risk, protects privacy and helps systems remain available and trustworthy.',
  },
  softwareengineering: {
    name: 'Software Engineering', category: 'Computer science',
    definition: 'Software engineering applies disciplined methods to design, build, test, deploy and maintain reliable software.',
    simple: 'Software engineering is the practice of building software carefully as a team—from understanding the need to testing and improving the finished product.',
    uses: ['Requirements and system design', 'Version control, code review and testing', 'Deployment, monitoring and maintenance'],
    example: 'A team may use small releases and automated tests to catch problems early.',
    why: 'Engineering practices help teams deliver software that is useful, maintainable and dependable.',
  },
};

const aliases = {
  python: ['python', 'பைதான்'],
  java: ['java', 'ஜாவா'],
  c: ['c language', 'programming in c', 'சி மொழி'],
  'c++': ['c++', 'cpp'],
  html: ['html', 'ஹெச்டிஎம்எல்'],
  css: ['css'],
  javascript: ['javascript', 'java script', 'js'],
  sql: ['sql'],
  dbms: ['dbms', 'database management system'],
  database: ['database', 'data base'],
  datastructures: ['data structures', 'data structure', 'லிஸ்ட்'],
  algorithms: ['algorithms', 'algorithm'],
  os: ['operating system', 'os', 'windows os'],
  networks: ['computer networks', 'computer network', 'networking', 'internet'],
  ai: ['artificial intelligence', 'ai', 'ஏஐ'],
  ml: ['machine learning', ' ml '],
  cloud: ['cloud computing', 'cloud'],
  cybersecurity: ['cybersecurity', 'cyber security', 'online safety'],
  softwareengineering: ['software engineering', 'software development'],
};

export function getConversationContext(messages = []) {
  const previousUserMessages = messages.filter((message) => message.role === 'user');
  for (let index = previousUserMessages.length - 1; index >= 0; index -= 1) {
    const topic = detectTopic(previousUserMessages[index].content);
    if (topic) return topic;
  }
  return null;
}

export function detectTopic(text, context = null) {
  const normalized = ` ${String(text).toLowerCase().replace(/[^\p{L}\p{N}+#. ]/gu, ' ')} `;
  const entries = Object.entries(aliases).sort((a, b) => Math.max(...b[1].map((alias) => alias.length)) - Math.max(...a[1].map((alias) => alias.length)));
  for (const [key, names] of entries) {
    if (names.some((name) => normalized.includes(` ${name.toLowerCase()} `) || normalized.trim() === name.toLowerCase())) {
      return { key, ...knowledge[key] };
    }
  }
  if (context && /\b(it|its|they|them|this|that|இதன்|அது|அதன்)\b|அதோட/.test(normalized)) {
    return typeof context === 'string' ? { key: context, ...knowledge[context] } : context;
  }
  return null;
}

export function detectIntent(text) {
  const value = text.toLowerCase().trim();
  if (/(what (?:is )?(?:the )?time|current time|time now|tell me the time|clock now|இப்போ.*மணி|இப்போது.*மணி|மணி என்ன|time enna|ippo time)/i.test(value)) return 'time';
  if (/(today['’]?s date|date is today|date today|today date|what (?:is )?date.*today|what is the date|current date|இன்னைக்கு.*தேதி|இன்று.*தேதி|தேதி என்ன)/i.test(value)) return 'date';
  if (/(what day|which day|day is today|today.*day|இன்னைக்கு.*கிழமை|இன்று.*கிழமை|கிழமை என்ன)/i.test(value)) return 'day';
  if (/^(hi|hello|hey|வணக்கம்|ஹாய்)\b/i.test(value)) return 'greeting';
  if (/(translate|translation|தமிழில்|in tamil|into tamil|tamil meaning|meaning in tamil)/i.test(value)) return 'translation';
  if (/(i am|i'm|feel|feeling).*(sad|stressed|anxious|worried|overwhelmed|lonely)|\b(sad|stressed|anxious|overwhelmed)\b/i.test(value)) return 'support';
  if (/(project idea|ideas for.*project|college project|mini project|project.*idea)/i.test(value)) return 'project';
  if (/(\d|[+\-*/%()])/.test(value) && /(what is|calculate|solve|equals|plus|minus|times|divided|add|subtract|multiply|மதிப்ப|கூட்ட|கழிக்க)/i.test(value)) return 'math';
  if (/(write|create|generate|show|give).*(code|program|script|function)|code to|program to/i.test(value)) return 'code';
  if (/(advantage|benefit|pros and cons|disadvantage|why is .*popular|why .* popular)/i.test(value)) return 'advantages';
  if (/(step by step|steps to|how do i|how to)/i.test(value)) return 'steps';
  if (/(simply|simple words|beginner|easy way|எளிமையாக)/i.test(value)) return 'simple';
  if (/(explain|describe|tell me about|elaborate)/i.test(value)) return 'explanation';
  if (/(what is|what are|define|meaning of|என்ன|na enna)/i.test(value)) return 'definition';
  if (/(career|job|learn programming|where should i start)/i.test(value)) return 'career';
  if (/(its|it|they|them|that|those|more|elaborate|advantages|example|இதன்|அது|அதன்)/i.test(value)) return 'followup';
  return 'general';
}

function formatTimeDate(now = new Date()) {
  return {
    time: new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', hour12: true }).format(now).replace(/\b(am|pm)\b/i, (period) => period.toUpperCase()),
    date: new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(now),
    day: new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(now),
  };
}

function calculateMath(text) {
  const expression = text
    .toLowerCase()
    .replace(/what is|calculate|solve|please|equals|equal to|how much is|the answer to/g, '')
    .replace(/plus/g, '+').replace(/minus/g, '-').replace(/times|multiplied by/g, '*')
    .replace(/divided by|divide/g, '/').replace(/×/g, '*').replace(/÷/g, '/')
    .replace(/[^0-9+\-*/().% ]/g, '').trim();
  if (!expression || !/^[\d+\-*/().% ]+$/.test(expression)) return null;
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    return Number.isFinite(result) ? `${expression} = ${result}` : null;
  } catch {
    return null;
  }
}

function translatedPhrase(text) {
  const quoted = text.match(/["“']([^"”']+)["”']/)?.[1] || text.match(/translate\s+(.+?)\s+(?:into|to)\s+tamil/i)?.[1];
  if (!quoted) return null;
  const phrase = quoted.trim().toLowerCase();
  const translations = {
    'good morning': 'காலை வணக்கம் (Kaalai vanakkam)',
    'good evening': 'மாலை வணக்கம் (Maalai vanakkam)',
    'good night': 'இனிய இரவு (Iniya iravu)',
    'thank you': 'நன்றி (Nandri)',
    hello: 'வணக்கம் (Vanakkam)',
    'how are you': 'நீங்கள் எப்படி இருக்கிறீர்கள்? (Neengal eppadi irukkireergal?)',
    'i love you': 'நான் உன்னை காதலிக்கிறேன் (Naan unnai kaadhalikkiren)',
  };
  return translations[phrase] || null;
}

function codeResponse(text, topic) {
  const lower = text.toLowerCase();
  if (/\bcalculator\b/.test(lower) && topic.key === 'python') {
    return `Here is a simple Python calculator for the four basic operations:\n\n\`\`\`python\nfirst = float(input("First number: "))\noperator = input("Choose +, -, * or /: ")\nsecond = float(input("Second number: "))\n\nif operator == "+":\n    result = first + second\nelif operator == "-":\n    result = first - second\nelif operator == "*":\n    result = first * second\nelif operator == "/" and second != 0:\n    result = first / second\nelse:\n    result = "Invalid operation"\n\nprint("Result:", result)\n\`\`\``;
  }
  if (/factorial/.test(lower) && topic.key === 'python') {
    return `Here is a Python program that calculates a factorial:\n\n\`\`\`python\nnumber = int(input("Enter a non-negative integer: "))\nif number < 0:\n    print("Factorial is not defined for negative numbers.")\nelse:\n    result = 1\n    for value in range(2, number + 1):\n        result *= value\n    print(f"{number}! = {result}")\n\`\`\`\n\nThe loop multiplies all whole numbers from 1 through the input value.`;
  }
  if (/\b(add|sum|addition|two numbers)\b/.test(lower)) {
    return `Here is a small ${topic.name} example that adds two numbers:\n\n\`\`\`${topic.key === 'python' ? 'python' : topic.key}\n${topic.key === 'python'
      ? 'first = float(input("First number: "))\\nsecond = float(input("Second number: "))\\nprint("Sum:", first + second)'
      : topic.key === 'javascript'
        ? 'const first = 12;\\nconst second = 8;\\nconsole.log("Sum:", first + second);'
        : 'Add two numeric values using the + operator and display the result.'}\n\`\`\`\n\nChange the values (or input) to try other numbers.`;
  }
  return `Here is a simple ${topic.name} starting point:\n\n\`\`\`${topic.key}\n${topic.example}\n\`\`\`\n\nTell me what you want the program to do and I can tailor the example.`;
}

export function generateResponse(question, messages = []) {
  const text = String(question || '').trim();
  const intent = detectIntent(text);
  const context = getConversationContext(messages);
  const topic = detectTopic(text, context);
  const { time, date, day } = formatTimeDate(new Date());

  if (intent === 'time') {
    return /ippo|இப்போ|இப்போது|மணி என்ன/i.test(text)
      ? `⏰ Ippo time ${time}.`
      : `⏰ The current time is ${time}.`;
  }
  if (intent === 'date') {
    return /இன்னைக்கு|இன்று/i.test(text) ? `📅 இன்னைக்கு தேதி ${date}.` : `📅 Today's date is ${date}.`;
  }
  if (intent === 'day') {
    return /இன்னைக்கு|இன்று/i.test(text) ? `🗓️ இன்னைக்கு ${day}.` : `🗓️ Today is ${day}.`;
  }
  if (intent === 'greeting') return 'Hello! 👋 I’m SmartGBT, your smart AI assistant. What would you like to explore today?';
  if (intent === 'support') return 'I’m sorry you’re feeling this way. 💛 It can help to pause for a moment, take a few slow breaths, and reach out to someone you trust. If you’d like, tell me a little about what’s been weighing on you, and we can think through one small next step together.';
  if (intent === 'translation') {
    const translation = translatedPhrase(text);
    return translation
      ? `🌐 **English:** ${text.match(/["“']([^"”']+)["”']/)?.[1] || text.match(/translate\s+(.+?)\s+(?:into|to)\s+tamil/i)?.[1]}\n\n**Tamil:** ${translation}`
      : '🌐 I can help with simple English-to-Tamil phrases. Try: `Translate "Good morning" into Tamil.`';
  }
  if (intent === 'math') {
    const answer = calculateMath(text);
    return answer ? `🧮 Let's work it out:\n\n**${answer}**` : '🧮 I can solve basic arithmetic. Try a question like “What is 25 + 35?”';
  }
  if (intent === 'project') {
    return '💡 **College project idea: Smart Study Planner**\n\nBuild a small app where students add subjects, topics and exam dates. It can break study goals into daily tasks and show progress.\n\n- **Core concepts:** forms, data structures and date calculations\n- **Possible stack:** HTML, CSS and JavaScript with browser localStorage\n- **Stretch feature:** a weekly progress chart or reminder checklist\n\nWould you like a feature list or a starter implementation plan?';
  }
  if (intent === 'career') {
    return '🧭 A good way to start is to choose one goal—web development, data, apps or systems—and learn the fundamentals that support it.\n\n1. Pick one beginner-friendly language and practice small programs.\n2. Learn Git, debugging and basic data structures.\n3. Build a few projects that solve real problems and explain what you learned.\n4. Review fundamentals regularly and ask for feedback.\n\nTell me your interests and current experience, and I can suggest a more focused path.';
  }
  if (topic) {
    if (intent === 'code') return codeResponse(text, topic);
    if (intent === 'advantages') return `✨ **Why ${topic.name} is useful**\n\n${topic.why}\n\nSome key benefits:\n${topic.uses.map((use) => `- ${use}`).join('\n')}\n\n**Example:**\n\`\`\`${topic.key}\n${topic.example}\n\`\`\``;
    if (intent === 'steps') return `🪜 **A simple way to get started with ${topic.name}**\n\n1. Learn the core idea: ${topic.definition}\n2. Try a tiny example: \`${topic.example.split('\n')[0]}\`\n3. Change one part and observe what happens.\n4. Build a small project using it.\n\n${topic.why}`;
    if (intent === 'simple') return `🌱 **${topic.name}, in simple words**\n\n${topic.simple}\n\n**Example:** ${topic.example.split('\n')[0]}\n\nWould you like me to explain a particular part?`;
    if (intent === 'followup') {
      const extra = /advantage|benefit|pros/i.test(text)
        ? `Some advantages include:\n${topic.uses.map((use) => `- ${use}`).join('\n')}\n\n${topic.why}`
        : /example/i.test(text) ? `Here’s an example:\n\n\`\`\`${topic.key}\n${topic.example}\n\`\`\``
          : `For **${topic.name}**, remember: ${topic.simple}\n\n${topic.why}`;
      return `Continuing with **${topic.name}**:\n\n${extra}`;
    }
    return `## ${topic.name}\n\n**${topic.category}**\n\n${topic.definition}\n\n### Common uses\n${topic.uses.map((use) => `- ${use}`).join('\n')}\n\n### Example\n\`\`\`${topic.key}\n${topic.example}\n\`\`\`\n\n${topic.why}`;
  }
  if (intent === 'code') return '💻 I can help write code in Python, Java, C, C++, HTML, CSS, JavaScript or SQL. Tell me the language and what you want the program to do.';
  if (intent === 'followup' && context) return `I’m following up on **${context.name}**. What would you like to know—an example, its advantages, or how it works?`;
  return 'I can help with programming, AI, computer science, education, mathematics, translations and general questions. This topic is not covered by the built-in Local SmartGBT knowledge yet. For open-ended answers, select and configure Ollama or an API-compatible model in Settings; otherwise, try asking about one of the supported subjects.';
}

function getProviderError(provider, detail) {
  const providerName = provider === 'ollama' ? 'Ollama' : 'the configured API';
  return new Error(`${providerName} could not answer: ${detail}`);
}

async function readProviderResponse(response, provider) {
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw getProviderError(provider, `the server returned an unreadable response (HTTP ${response.status}).`);
  }
  if (!response.ok) {
    const detail = payload?.error?.message || payload?.error || payload?.message || `HTTP ${response.status}`;
    throw getProviderError(provider, String(detail));
  }
  const answer = provider === 'ollama'
    ? payload?.message?.content
    : payload?.choices?.[0]?.message?.content;
  if (typeof answer !== 'string' || !answer.trim()) {
    throw getProviderError(provider, 'the model returned an empty answer. Check the selected model and try again.');
  }
  return answer.trim();
}

export async function requestResponse(question, messages = [], settings = {}) {
  const text = String(question || '').trim();
  if (!text) throw new Error('Please enter a question 😊');

  const intent = detectIntent(text);
  if (intent === 'time' || intent === 'date' || intent === 'day') return generateResponse(text, messages);

  const provider = settings.provider || 'local';
  if (provider === 'local') return generateResponse(text, messages);

  const history = messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .map((message) => ({ role: message.role, content: message.content }));
  const requestMessages = [
    {
      role: 'system',
      content: 'You are SmartGBT, a clear, kind, general-purpose assistant. Answer the user’s complete question directly. Explain unfamiliar topics, provide examples and format code in Markdown fences. Be honest about uncertainty and do not invent current facts.',
    },
    ...history,
    { role: 'user', content: text },
  ];

  if (provider === 'ollama') {
    const endpoint = `${(settings.ollamaUrl || '').trim().replace(/\/+$/, '')}/api/chat`;
    const model = (settings.ollamaModel || '').trim();
    if (!model) throw getProviderError(provider, 'enter a model name in Settings.');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: requestMessages, stream: false }),
      });
      return await readProviderResponse(response, provider);
    } catch (error) {
      if (error instanceof TypeError) {
        throw getProviderError(provider, `could not connect to ${endpoint}. Make sure the local server is running and allows browser access.`);
      }
      throw error;
    }
  }

  if (provider === 'api') {
    const endpoint = (settings.apiUrl || '').trim();
    const model = (settings.apiModel || '').trim();
    const apiKey = (settings.apiKey || '').trim();
    if (!endpoint || !model || !apiKey) {
      throw getProviderError(provider, 'configure the endpoint, model and API key in Settings.');
    }
    let parsedEndpoint;
    try {
      parsedEndpoint = new URL(endpoint);
    } catch {
      throw getProviderError(provider, 'the endpoint must be a complete URL.');
    }
    if (!['http:', 'https:'].includes(parsedEndpoint.protocol)) {
      throw getProviderError(provider, 'the endpoint must use HTTP or HTTPS.');
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages: requestMessages }),
      });
      return await readProviderResponse(response, provider);
    } catch (error) {
      if (error instanceof TypeError) {
        throw getProviderError(provider, `could not connect to ${endpoint}. Check the URL, network connection and endpoint CORS settings.`);
      }
      throw error;
    }
  }

  throw new Error('The selected response provider is not supported. Choose Local SmartGBT, Ollama or API in Settings.');
}

export { knowledge };
