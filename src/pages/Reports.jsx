import { formatarMoeda, obterStatus } from "../components/ProductTable";

function Reports({ produtos, limiteEstoqueBaixo }) {
  const unidades = produtos.reduce((soma, produto) => soma + produto.quantidade, 0);
  const valor = produtos.reduce((soma, produto) => soma + produto.quantidade * produto.preco, 0);
  const listaCategorias = Object.entries(produtos.reduce((grupos, produto) => {
    const nome = produto.categoria || "Sem categoria";
    grupos[nome] = (grupos[nome] || 0) + produto.quantidade;
    return grupos;
  }, {})).sort((a, b) => b[1] - a[1]);
  const exportar = () => {
    const cabecalho = ["Produto", "Categoria", "Quantidade", "Preço unitário", "Valor em estoque", "Status"];
    const linhas = produtos.map((produto) => [produto.nome, produto.categoria, produto.quantidade, produto.preco.toFixed(2), (produto.quantidade * produto.preco).toFixed(2), obterStatus(produto, limiteEstoqueBaixo)]);
    const csv = [cabecalho, ...linhas].map((linha) => linha.map((campo) => `"${String(campo).replaceAll('"', '""')}"`).join(";")).join("\n");
    const arquivo = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(arquivo);
    link.download = "relatorio-estoque.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return <section className="flex flex-col gap-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-800">Relatórios</h1><p className="mt-1 text-sm text-slate-500">Resumo do valor e da distribuição do seu estoque.</p></div><button type="button" onClick={exportar} disabled={!produtos.length} className="min-h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">Exportar CSV</button></div>
    <div className="grid gap-3 sm:grid-cols-3"><article className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Produtos cadastrados</p><strong className="mt-2 block text-2xl">{produtos.length}</strong></article><article className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Unidades disponíveis</p><strong className="mt-2 block text-2xl">{unidades}</strong></article><article className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Valor total estimado</p><strong className="mt-2 block text-2xl">{formatarMoeda(valor)}</strong></article></div>
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"><h2 className="mb-4 font-bold">Unidades por categoria</h2>{listaCategorias.length === 0 ? <p className="text-sm text-slate-500">Não há dados para exibir.</p> : <div className="flex flex-col gap-4">{listaCategorias.map(([nome, quantidade]) => <div key={nome}><div className="mb-1 flex justify-between text-sm"><span>{nome}</span><strong>{quantidade}</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${unidades ? quantidade / unidades * 100 : 0}%` }} /></div></div>)}</div>}</div>
  </section>;
}

export default Reports;
