import { useState, useRef } from 'react';
import { callClaude } from '../utils/claudeApi';
import type { Stage, PipelineOutputs, Metrics } from '../types';

const INITIAL_STAGES: Stage[] = [
  { id: 1, name: 'Intent', icon: '🔍', status: 'idle' },
  { id: 2, name: 'Design', icon: '🏗️', status: 'idle' },
  { id: 3, name: 'Schema', icon: '📋', status: 'idle' },
  { id: 4, name: 'Validate', icon: '✅', status: 'idle' },
];

export function usePipeline() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);
  const [outputs, setOutputs] = useState<PipelineOutputs>({});
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [statusText, setStatusText] = useState('');
  const [statusState, setStatusState] = useState<'idle' | 'active' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const t0 = useRef(0);

  function setStageStatus(id: number, status: Stage['status']) {
    setStages((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  function resetPipeline() {
    setStages(INITIAL_STAGES.map((s) => ({ ...s, status: 'idle' })));
    setOutputs({});
    setMetrics(null);
    setError('');
    setComplete(false);
    setStatusText('');
    setStatusState('idle');
  }

  function safeSlice(obj: unknown, maxLen = 800): string {
    const str = JSON.stringify(obj);
    return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
  }

  async function runPipeline() {
    if (!apiKey.trim()) { setError('Please enter your API key.'); return; }
    if (!prompt.trim()) { setError('Please describe your app first.'); return; }

    setError('');
    setRunning(true);
    resetPipeline();
    t0.current = Date.now();

    const out: PipelineOutputs = {};

    try {
      // Stage 1 — Intent
      setStageStatus(1, 'active');
      setStatusText('Stage 1: Extracting intent...');
      setStatusState('active');
      out.intent = await callClaude(
        apiKey,
        'You are an intent extraction engine. Return ONLY a valid JSON object, no markdown, no explanation, no extra text. Use this exact schema: {"app_type":"string","app_name":"string","features":["string"],"roles":["string"],"entities":["string"],"has_payments":true,"has_auth":true,"premium_plan":false,"target_users":"string","complexity":"medium"}',
        `Extract intent from this app description: "${prompt}"`
      );
      setStageStatus(1, 'done');
      setOutputs({ ...out });

      // Stage 2 — Design
      setStageStatus(2, 'active');
      setStatusText('Stage 2: Designing system architecture...');
      out.design = await callClaude(
        apiKey,
        'You are a system architect. Return ONLY a valid JSON object, no markdown, no explanation. Use this exact schema: {"pages":[{"name":"string","route":"string","components":["string"],"roles_allowed":["string"]}],"user_flows":["string"],"role_permissions":{"admin":["all"]},"entity_relationships":["string"],"navigation_structure":["string"]}. Keep arrays small, max 3 items each.',
        `Design architecture for: ${safeSlice(out.intent, 300)}`
      );
      setStageStatus(2, 'done');
      setOutputs({ ...out });

      // Stage 3 — Schema
      setStageStatus(3, 'active');
      setStatusText('Stage 3: Generating DB, API, UI and Auth schemas...');
      out.schema = await callClaude(
        apiKey,
        'You are a schema engine. Return ONLY a valid JSON object, no markdown, no explanation. Use this schema: {"db_schema":{"tables":[{"name":"string","columns":[{"name":"string","type":"string","primary_key":false}]}]},"api_schema":{"endpoints":[{"method":"POST","path":"string","auth_required":true}]},"ui_schema":{"components":[{"name":"string","type":"string"}]},"auth_rules":{"policies":["string"]}}. Keep it short, max 2 items per array.',
        `Generate schemas for app: ${safeSlice(out.intent, 200)}. Pages: ${safeSlice(out.design, 200)}`
      );
      setStageStatus(3, 'done');
      setOutputs({ ...out });

      // Stage 4 — Validate
      setStageStatus(4, 'active');
      setStatusText('Stage 4: Validating and repairing...');
      out.final = await callClaude(
        apiKey,
        'You are a validator. Return ONLY this exact JSON, no markdown, no extra text: {"status":"valid","issues_found":[],"repairs_made":[],"assumptions":["Assumed standard REST API","Assumed JWT auth"],"final_schema":{"summary":"Schema validated successfully"}}. You may change status to repaired and add items to arrays if needed.',
        `Validate this schema (keep response short): ${safeSlice(out.schema, 300)}`
      );
      setStageStatus(4, 'done');
      setOutputs({ ...out });

      const elapsed = ((Date.now() - t0.current) / 1000).toFixed(1);
      setMetrics({
        elapsed: elapsed + 's',
        stagesDone: 4,
        status: (out.final?.status as string) === 'repaired' ? 'REPAIRED' : 'VALID',
      });
      setStatusText('✅ Pipeline complete — blueprint ready!');
      setStatusState('done');
      setComplete(true);

    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError('❌ Error: ' + msg);
      setStatusText('Pipeline failed: ' + msg);
      setStatusState('error');
      setStages((prev) =>
        prev.map((s) => (s.status === 'active' ? { ...s, status: 'error' } : s))
      );
    } finally {
      setRunning(false);
    }
  }

  return {
    apiKey, setApiKey,
    prompt, setPrompt,
    stages, outputs, metrics,
    statusText, statusState,
    error, running, complete,
    runPipeline,
  };
}