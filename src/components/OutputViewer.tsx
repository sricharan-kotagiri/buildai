import { useState } from 'react';
import { syntaxHighlight } from '../utils/syntaxHighlight';
import type { PipelineOutputs, TabKey } from '../types';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'intent', label: 'Intent' },
  { key: 'design', label: 'Design' },
  { key: 'schema', label: 'Schema' },
  { key: 'final', label: 'Final' },
  { key: 'all', label: 'Full JSON' },
];

interface Props { outputs: PipelineOutputs; }

export function OutputViewer({ outputs }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('intent');
  const [copied, setCopied] = useState(false);

  const getData = (k: TabKey) => k === 'all' ? outputs : outputs[k] ?? {};

  function copy() {
    navigator.clipboard.writeText(JSON.stringify(getData(activeTab), null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const json = JSON.stringify(getData(activeTab), null, 2);

  return (
    <div className="card">
      <div className="card-label">Generated Blueprint</div>
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="json-wrap">
        <button className="copy-btn" onClick={copy}>
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
        <div
          className="json-out"
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }}
        />
      </div>
    </div>
  );
}
