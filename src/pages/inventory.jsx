import ProductTable from "../components/ProductTable";

function Inventory({ produtos, limiteEstoqueBaixo, onSalvar }) {
  const criticos = produtos.filter((produto) => produto.quantidade <= limiteEstoqueBaixo);
  function ajustar(produto, delta) {
    const quantidade = Math.max(0, produto.quantidade + delta);
    onSalvar({ ...produto, quantidade });
  }

  return <section className="flex flex-col gap-5"><div><h1 className="text-2xl font-bold text-slate-800">Estoque</h1><p className="mt-1 text-sm text-slate-500">Ajuste quantidades e acompanhe os itens que precisam de reposição.</p></div>
    <div className="grid gap-3 sm:grid-cols-3"><article className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Unidades cadastradas</p><strong className="mt-1 block text-2xl">{produtos.reduce((soma, produto) => soma + produto.quantidade, 0)}</strong></article><article className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Itens em nível baixo</p><strong className="mt-1 block text-2xl">{criticos.filter((produto) => produto.quantidade > 0).length}</strong></article><article className="rounded-xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">Sem estoque</p><strong className="mt-1 block text-2xl">{criticos.filter((produto) => produto.quantidade === 0).length}</strong></article></div>
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"><h2 className="mb-3 text-base font-bold">Ajuste rápido</h2>{produtos.length === 0 ? <p className="text-sm text-slate-500">Nenhum produto encontrado.</p> : <ul className="divide-y divide-slate-100">{produtos.map((produto) => <li key={produto.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="text-sm font-semibold text-slate-800">{produto.nome}</p><p className="text-xs text-slate-500">{produto.categoria} · {produto.quantidade} unidades</p></div><div className="flex items-center gap-2"><button type="button" aria-label={`Remover uma unidade de ${produto.nome}`} onClick={() => ajustar(produto, -1)} className="size-9 rounded-lg border border-slate-200 text-lg hover:bg-slate-50">−</button><span className="min-w-8 text-center text-sm font-bold">{produto.quantidade}</span><button type="button" aria-label={`Adicionar uma unidade de ${produto.nome}`} onClick={() => ajustar(produto, 1)} className="size-9 rounded-lg border border-slate-200 text-lg hover:bg-slate-50">+</button></div></li>)}</ul>}</div>
    <ProductTable produtos={criticos} titulo="Produtos que precisam de atenção" mostrarLink={false} limiteEstoqueBaixo={limiteEstoqueBaixo} />
  </section>;
}

export default Inventory;
