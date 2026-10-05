import React, { useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';

function renderInline(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function renderContent(content) {
  const blocks = String(content).split(/```([^\n]*)\n([\s\S]*?)```/g);
  const rendered = [];
  for (let index = 0; index < blocks.length; index += 1) {
    if (index % 3 === 1) {
      rendered.push(
        <pre key={`code-${index}`}><code className="code-language">{blocks[index] || 'code'}</code><code>{blocks[index + 1]}</code></pre>,
      );
      index += 1;
      continue;
    }
    const lines = blocks[index].split('\n');
    let list = [];
    let listType = null;
    const flushList = (key) => {
      if (!list.length) return null;
      const items = list;
      list = [];
      return listType === 'ordered'
        ? <ol key={key}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ol>
        : <ul key={key}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}</ul>;
    };
    lines.forEach((line, lineIndex) => {
      const bullet = line.match(/^\s*[-*]\s+(.+)/);
      const numbered = line.match(/^\s*\d+[.)]\s+(.+)/);
      if (bullet || numbered) {
        const nextType = bullet ? 'unordered' : 'ordered';
        if (listType && listType !== nextType) rendered.push(flushList(`list-${index}-${lineIndex}`));
        listType = nextType;
        list.push((bullet || numbered)[1]);
      } else {
        if (list.length) rendered.push(flushList(`list-${index}-${lineIndex}`));
        listType = null;
        if (/^#{1,3}\s/.test(line)) {
          const depth = line.match(/^#+/)[0].length;
          const Heading = `h${depth + 1}`;
          rendered.push(<Heading key={`line-${index}-${lineIndex}`}>{renderInline(line.replace(/^#{1,3}\s/, ''))}</Heading>);
        } else if (line.trim()) {
          rendered.push(<p key={`line-${index}-${lineIndex}`}>{renderInline(line)}</p>);
        } else if (lineIndex > 0 && lineIndex < lines.length - 1) {
          rendered.push(<div className="message-spacer" key={`space-${index}-${lineIndex}`} />);
        }
      }
    });
    if (list.length) rendered.push(flushList(`list-${index}-end`));
  }
  return rendered;
}

export default function MessageBubble({ message, onRetry }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      console.error('Could not copy the response.', error);
    }
  };

  if (message.role === 'user') {
    return <div className="message-row user-row"><div className="user-bubble">{message.content}</div></div>;
  }
  return (
    <div className="message-row assistant-row">
      <div className="assistant-avatar" aria-label="SmartGBT">S</div>
      <div className="assistant-content">
        <div className="assistant-name">SmartGBT</div>
        <div className="message-markdown">{renderContent(message.content)}</div>
        <div className="message-actions">
          <button type="button" aria-label={copied ? 'Copied' : 'Copy response'} onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
          {onRetry && <button type="button" aria-label="Retry response" onClick={onRetry}><RotateCcw size={15} /></button>}
        </div>
      </div>
    </div>
  );
}
