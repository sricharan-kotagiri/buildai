export function Header() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0 2rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 48, height: 48,
          background: 'linear-gradient(135deg, var(--cyan), var(--blue))',
          borderRadius: 12, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 24
        }}>⚙️</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>
          Build<span style={{ color: 'var(--cyan)' }}>AI</span>
        </div>
      </div>
      <div style={{ fontSize: 14, color: 'var(--text2)', letterSpacing: '0.5px' }}>
        Natural language → structured app blueprint • 4-stage AI pipeline
      </div>
      <div style={{
        display: 'inline-block', marginTop: 10, padding: '4px 14px',
        border: '1px solid var(--border2)', borderRadius: 20,
        fontSize: 11, color: 'var(--cyan)', fontFamily: 'var(--mono)'
      }}>
        ✦ Powered by Groq LLaMA 3.3 • Free
      </div>
    </div>
  );
}
