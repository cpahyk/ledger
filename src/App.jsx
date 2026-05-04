import { useState, useMemo } from 'react';
import { Menu, X, FileCode } from 'lucide-react';

// Auto-discover every .jsx file dropped into src/artifacts/.
// No need to manually import each one — Vite resolves them at build time.
const modules = import.meta.glob('./artifacts/*.jsx', { eager: true });

const ARTIFACTS = Object.entries(modules)
  .map(([path, mod]) => {
    const filename = path.split('/').pop().replace('.jsx', '');
    const label = filename
      .replace(/^ledger_/, '')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { id: filename, label, Component: mod.default };
  })
  .filter((a) => typeof a.Component === 'function')
  .sort((a, b) => a.label.localeCompare(b.label));

export default function App() {
  const [activeId, setActiveId] = useState(ARTIFACTS[0]?.id);
  const [navOpen, setNavOpen] = useState(false);

  const active = useMemo(
    () => ARTIFACTS.find((a) => a.id === activeId),
    [activeId]
  );

  if (ARTIFACTS.length === 0) {
    return <EmptyState />;
  }

  const Current = active?.Component;

  return (
    <div className="flex h-screen bg-stone-50">
      {/* Sidebar */}
      <aside
        className={`${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#0B3D3A] text-stone-100 flex flex-col transition-transform duration-200 ease-out`}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-2xl font-serif tracking-tight">Ledger</div>
            <div className="text-xs text-stone-400 mt-0.5">
              {ARTIFACTS.length} {ARTIFACTS.length === 1 ? 'artifact' : 'artifacts'}
            </div>
          </div>
          <button
            className="md:hidden text-stone-300 hover:text-white"
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {ARTIFACTS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setActiveId(a.id);
                setNavOpen(false);
              }}
              className={`w-full text-left px-6 py-2.5 text-sm transition-colors ${
                activeId === a.id
                  ? 'bg-white/10 text-white border-l-2 border-amber-400'
                  : 'text-stone-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
              }`}
            >
              {a.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10 text-xs text-stone-400">
          <div className="font-medium text-stone-200">Ledger Suite</div>
          <div className="mt-1">CPA practice platform · preview build</div>
        </div>
      </aside>

      {/* Main canvas */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#0B3D3A] text-white">
          <button onClick={() => setNavOpen(true)} aria-label="Open navigation">
            <Menu size={22} />
          </button>
          <div className="font-serif text-lg">Ledger</div>
          <div className="text-xs text-stone-400 ml-auto">{active?.label}</div>
        </header>

        <div className="flex-1 overflow-auto bg-white">
          {Current ? <Current /> : <EmptyState />}
        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <FileCode className="mx-auto text-stone-400" size={48} />
        <h2 className="mt-4 text-2xl font-serif text-stone-800">
          No artifacts yet
        </h2>
        <p className="mt-3 text-stone-600 leading-relaxed">
          Drop your <code className="px-1.5 py-0.5 bg-stone-100 rounded text-sm">.jsx</code> files into{' '}
          <code className="px-1.5 py-0.5 bg-stone-100 rounded text-sm">src/artifacts/</code> and refresh.
          Each file should{' '}
          <code className="px-1.5 py-0.5 bg-stone-100 rounded text-sm">export default</code> a React component.
        </p>
        <p className="mt-3 text-stone-500 text-sm">
          They'll appear in the sidebar automatically — no imports required.
        </p>
      </div>
    </div>
  );
}
