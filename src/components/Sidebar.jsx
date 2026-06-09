import { LayoutDashboard, CalendarDays, Users, Sparkles } from 'lucide-react';

const NAV = [
  { id: 'board', label: 'Lead Board', icon: LayoutDashboard },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'creators', label: 'Creators', icon: Users },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">LinkedCRM</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand/15 text-brand-light'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-zinc-800 text-xs text-zinc-500">
        Comment-to-Connection CRM
      </div>
    </aside>
  );
}
