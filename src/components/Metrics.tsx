import type { Metrics as MetricsType } from '../types';

interface Props { metrics: MetricsType | null; }

export function Metrics({ metrics }: Props) {
  if (!metrics) return null;
  return (
    <div className="metrics">
      <div className="metric">
        <div className="mval">{metrics.elapsed}</div>
        <div className="mlbl">LATENCY</div>
      </div>
      <div className="metric">
        <div className="mval">{metrics.stagesDone}/4</div>
        <div className="mlbl">STAGES DONE</div>
      </div>
      <div className="metric">
        <div className="mval" style={{ fontSize: 16 }}>{metrics.status}</div>
        <div className="mlbl">STATUS</div>
      </div>
    </div>
  );
}
