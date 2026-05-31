import type { Stage } from '../types';

interface Props { stages: Stage[]; }

export function Pipeline({ stages }: Props) {
  return (
    <div className="pipeline">
      {stages.map((s) => (
        <div key={s.id} className={`stage ${s.status !== 'idle' ? s.status : ''}`}>
          <div className="stage-icon">{s.icon}</div>
          <div className="stage-n">STAGE 0{s.id}</div>
          <div className="stage-title">{s.name}</div>
        </div>
      ))}
    </div>
  );
}
