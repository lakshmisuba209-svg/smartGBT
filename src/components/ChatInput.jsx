import React, { useEffect, useRef } from 'react';
import { ArrowUp, Eraser } from 'lucide-react';

export default function ChatInput({ value, setValue, onSend, isThinking, enterToSend, validationMessage, provider }) {
  const inputRef = useRef(null);
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [value]);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && enterToSend) {
      event.preventDefault();
      onSend();
    }
  };
  return (
    <div className="input-wrap">
      <div className="chat-input-box">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SmartGBT anything..."
          aria-label="Message SmartGBT"
          rows={1}
          disabled={isThinking}
        />
        {validationMessage && <div className="input-validation" role="alert">{validationMessage}</div>}
        <div className="input-controls">
          <span className="input-hint">Shift + Enter for a new line</span>
          <div className="input-buttons">
            {value && <button className="clear-input" type="button" onClick={() => setValue('')} aria-label="Clear input"><Eraser size={17} /></button>}
            <button className="send-button" type="button" onClick={onSend} disabled={isThinking} aria-label="Send message">
              <ArrowUp size={19} />
            </button>
          </div>
        </div>
      </div>
      <p className="privacy-note">{provider === 'api' ? 'Your messages are sent to the API endpoint you configured.' : provider === 'ollama' ? 'Your messages are sent to your configured local Ollama server.' : 'SmartGBT runs locally in your browser. No external AI service is connected.'}</p>
    </div>
  );
}
