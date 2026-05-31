interface Props {
  text: string;
  state: 'idle' | 'active' | 'done' | 'error';
}

export function StatusBar({ text, state }: Props) {
  if (!text) return null;
  return (
    <div className="status-row">
      <div className={`sdot ${state}`} />
      <span>{text}</span>
    </div>
  );
}
