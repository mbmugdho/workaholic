import ThemeToggle from "./components/common/ThemeToggle";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="navbar bg-base-100 border-b">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Workaholic</a>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </div>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="card bg-base-100 border shadow-sm">
          <div className="card-body">
            <h1 className="card-title">Phase 1 Check</h1>
            <p className="text-base-content/80">
              If this card styling changes with the theme toggle, DaisyUI + Tailwind
              are configured correctly.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">DaisyUI Button</button>
              <button className="btn btn-outline">Outline</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}