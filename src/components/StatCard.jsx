import { Box, CircleDollarSign, TriangleAlert } from "lucide-react";

function StatCard(props) {
  const tones = {
    "Total de produtos": { icon: Box, iconClass: "text-emerald-700", bubble: "bg-emerald-50" },
    "Produtos em estoque": { icon: Box, iconClass: "text-amber-500", bubble: "bg-amber-50" },
    "Estoque baixo": { icon: TriangleAlert, iconClass: "text-rose-600", bubble: "bg-rose-50" },
    "Valor total do estoque": { icon: CircleDollarSign, iconClass: "text-emerald-700", bubble: "bg-emerald-50" },
  };
  const tone = tones[props.titulo] ?? tones["Total de produtos"];
  const Icon = tone.icon;
  return (
    <article className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tone.bubble} ${tone.iconClass}`}>
        <Icon size={22} strokeWidth={2.2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500">{props.titulo}</p>
        <strong className="mt-1 block truncate text-2xl font-bold tracking-tight text-slate-800">
          {props.valor}
        </strong>
        <span className="mt-1 block text-xs font-semibold text-emerald-600">{props.variacao}</span>
        <span className="mt-1 block text-[10px] text-slate-400">em relação ao mês passado</span>
      </div>
    </article>
  );
}

export default StatCard;
