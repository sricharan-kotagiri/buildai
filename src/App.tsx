import { Header } from './components/Header';
import { ApiKeyInput } from './components/ApiKeyInput';
import { PromptInput } from './components/PromptInput';
import { Pipeline } from './components/Pipeline';
import { StatusBar } from './components/StatusBar';
import { Metrics } from './components/Metrics';
import { OutputViewer } from './components/OutputViewer';
import { usePipeline } from './hooks/usePipeline';

export default function App() {
  const {
    apiKey, setApiKey,
    prompt, setPrompt,
    stages, outputs, metrics,
    statusText, statusState,
    error, running, complete,
    runPipeline,
  } = usePipeline();

  const hasStarted = stages.some((s) => s.status !== 'idle');

  return (
    <div className="wrap">
      <Header />
      <ApiKeyInput value={apiKey} onChange={setApiKey} />
      <PromptInput value={prompt} onChange={setPrompt} />

      <button className="run-btn" onClick={runPipeline} disabled={running}>
        {running
          ? <><span className="spin">⚙</span> Running pipeline...</>
          : <><span>▶</span> Generate App Blueprint</>
        }
      </button>

      {error && <div className="err-msg">{error}</div>}

      {hasStarted && (
        <>
          <Pipeline stages={stages} />
          <StatusBar text={statusText} state={statusState} />
          <Metrics metrics={metrics} />
          {complete && <OutputViewer outputs={outputs} />}
        </>
      )}

      <div className="footer">
        BuildAI • Powered by SRI CHARAN • ree • 4-stage generation pipeline
      </div>
    </div>
  );
}
