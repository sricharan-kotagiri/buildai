interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function ApiKeyInput({ value, onChange }: Props) {
  return (
    <div className="card">
      <div className="card-label">Groq API Key (Free)</div>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="gsk_..."
        autoComplete="off"
      />
      <div className="hint">
        🔒 Never stored — sent directly to Groq •{' '}
        <a
          href="https://console.groq.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--cyan)', textDecoration: 'none' }}
        >
          Get free key →
        </a>
      </div>
    </div>
  );
}
