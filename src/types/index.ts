export type StageStatus = 'idle' | 'active' | 'done' | 'error';

export interface Stage {
  id: number;
  name: string;
  icon: string;
  status: StageStatus;
}

export interface PipelineOutputs {
  intent?: Record<string, unknown>;
  design?: Record<string, unknown>;
  schema?: Record<string, unknown>;
  final?: Record<string, unknown>;
}

export interface Metrics {
  elapsed: string;
  stagesDone: number;
  status: string;
}

export type TabKey = 'intent' | 'design' | 'schema' | 'final' | 'all';
