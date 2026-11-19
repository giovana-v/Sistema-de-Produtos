import {
  Box,
  ChartNoAxesColumn,
  ClipboardList,
  Folder,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  ["Dashboard", "/", LayoutDashboard],
  ["Produtos", "/produtos", Box],
  ["Categorias", "/categorias", Folder],
  ["Estoque", "/estoque", ClipboardList],
  ["Relatórios", "/relatorios", ChartNoAxesColumn],
  ["Configurações", "/configuracoes", Settings],
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-56 shrink-0 flex-col bg-teal-950 text-white max-md:min-h-0 max-md:w-full">
      <div className="border-b border-white/10 px-5 py-4 md:py-7">
        <div className="flex items-center gap-3">
          <Box size={30} strokeWidth={1.8} />
          <div>
            <h2 className="text-xl font-semibold leading-tight">StockWise</h2>
            <p className="mt-0.5 text-[10px] text-teal-100">
              Seu estoque, sob controle
            </p>
          </div>
        </div>
      </div>
      <nav
        aria-label="Navegação principal"
        className="flex-1 px-2 py-2 sm:px-3 md:py-5"
      >
        <ul className="flex flex-wrap gap-1.5 md:flex-col">
          {links.map(([label, href, Icon]) => (
            <li key={label}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:gap-3 md:text-sm ${isActive ? "bg-white/10 font-semibold" : "font-medium text-teal-50"}`
                }
              >
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="flex items-center justify-between border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full bg-teal-800 text-sm">
            GA
          </div>
          <div className="flex flex-col">
            <strong className="text-xs font-semibold">Giovana Alves</strong>
            <span className="text-[10px] text-teal-200">Administrador</span>
          </div>
        </div>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md text-teal-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          title="Sair"
          aria-label="Sair"
        >
          <LogOut size={18} aria-hidden="true" />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;
