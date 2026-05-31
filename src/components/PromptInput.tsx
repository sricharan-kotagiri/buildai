const EXAMPLES = [
  { label: '⚡ CRM + payments', text: 'Build a CRM with login, contacts, dashboard, role-based access and premium plan with payments. Admins can see analytics.' },
  { label: '🛒 E-commerce', text: 'Build an e-commerce store with product listings, cart, checkout, order tracking, seller dashboard and Stripe payments.' },
  { label: '✅ Task manager', text: 'Build a task manager with workspaces, drag-drop boards, deadlines, team collaboration, comments and file uploads.' },
  { label: '💬 Social platform', text: 'Build a social platform with user profiles, posts, likes, comments, follow system, direct messages and content moderation.' },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function PromptInput({ value, onChange }: Props) {
  return (
    <div className="card">
      <div className="card-label">Describe Your App</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Build a CRM with login, contacts, dashboard, role-based access and premium plan with payments..."
      />
      <div className="chips">
        {EXAMPLES.map((ex) => (
          <button key={ex.label} className="chip" onClick={() => onChange(ex.text)}>
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
