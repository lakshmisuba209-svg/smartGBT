import React from 'react';
import { BookOpen, Calculator, Code2, Lightbulb, Sparkles } from 'lucide-react';

const suggestions = [
  { icon: '🐍', label: 'Explain Python', prompt: 'Explain Python simply', color: 'lavender' },
  { icon: '🤖', label: 'What is AI?', prompt: 'What is AI?', color: 'blue' },
  { icon: <Code2 size={19} />, label: 'Help me write code', prompt: 'Write Python code to add two numbers', color: 'mint' },
  { icon: <BookOpen size={19} />, label: 'Explain a topic', prompt: 'Explain machine learning simply', color: 'peach' },
  { icon: <Calculator size={19} />, label: 'Solve a math problem', prompt: 'What is 25 + 35?', color: 'yellow' },
  { icon: <Lightbulb size={19} />, label: 'Give me a project idea', prompt: 'Give me a college project idea', color: 'pink' },
];

export default function WelcomeScreen({ onPrompt }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-sparkle"><Sparkles size={21} /></div>
      <div className="welcome-eyebrow">A little curiosity goes a long way</div>
      <h1>Welcome to SmartGBT <span>👋</span></h1>
      <div className="welcome-tagline">Your Smart AI Assistant</div>
      <p className="welcome-subtitle">Ask questions, learn concepts and solve problems.</p>
      <div className="suggestion-grid">
        {suggestions.map((item) => (
          <button key={item.label} type="button" className={`suggestion-card ${item.color}`} onClick={() => onPrompt(item.prompt)}>
            <span className="suggestion-icon">{item.icon}</span>
            <span>{item.label}</span>
            <span className="suggestion-arrow">↗</span>
          </button>
        ))}
      </div>
    </div>
  );
}
