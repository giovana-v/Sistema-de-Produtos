import { Search, Bell, ChevronDown } from "lucide-react";

function Header({ busca, onBusca }) {
  return (
    <div className="flex items-center justify-between gap-3 sm:gap-4">
      <label className="flex min-h-11 w-full max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-700">
        <Search size={18} className="text-slate-400" />
        <input
          type="search"
          aria-label="Buscar produtos"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(event) => onBusca(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        <Search size={17} className="text-emerald-700" />
      </label>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button type="button" aria-label="Notificações" className="flex size-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
          <Bell size={20} aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-teal-950 text-sm font-medium text-white">
            GA
          </div>
          <ChevronDown size={16} className="text-slate-600" />
        </div>
      </div>
    </div>
  );
}

export default Header;
