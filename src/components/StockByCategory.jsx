import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function StockByCategory({ produtos }) {
  const totais = produtos.reduce((resultado, produto) => {
    const categoria = produto.categoria || "Sem categoria";
    resultado[categoria] = (resultado[categoria] || 0) + Number(produto.quantidade || 0);
    return resultado;
  }, {});
  const categorias = Object.entries(totais).sort((a, b) => b[1] - a[1]);
  const cores = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444", "#14b8a6", "#eab308", "#6366f1"];
  const data = { labels: categorias.map(([nome]) => nome), datasets: [{ data: categorias.map(([, quantidade]) => quantidade), backgroundColor: categorias.map((_, index) => cores[index % cores.length]), borderWidth: 0 }] };
  const options = { cutout: "70%", plugins: { legend: { display: false } } };
  const total = produtos.reduce((soma, produto) => soma + Number(produto.quantidade || 0), 0);

  return <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
    <h2 className="mb-4 text-base font-bold text-slate-800">Unidades por categoria</h2>
    {categorias.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">Cadastre produtos para visualizar a distribuição.</p> : <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap sm:gap-5">
      <div role="img" aria-label={`Gráfico de rosca com ${total} unidades distribuídas por categoria`} className="relative size-36 shrink-0 sm:size-40"><Doughnut data={data} options={options} /><div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><strong className="text-xl text-slate-800">{total}</strong><span className="text-[10px] text-slate-500">unidades</span></div></div>
      <ul aria-label="Quantidade por categoria" className="flex max-h-44 flex-1 flex-col gap-3 overflow-y-auto">{categorias.map(([nome, quantidade], index) => <li key={nome} className="flex items-center gap-2"><span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: cores[index % cores.length] }} /><span className="flex-1 text-xs text-slate-500">{nome}</span><span className="text-xs font-semibold text-slate-600">{quantidade}</span></li>)}</ul>
    </div>}
  </div>;
}

export default StockByCategory;
