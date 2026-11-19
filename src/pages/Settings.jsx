function Settings({ limiteEstoqueBaixo, onLimiteChange, totalProdutos }) {
  return <section className="flex flex-col gap-5"><div><h1 className="text-2xl font-bold text-slate-800">Configurações</h1><p className="mt-1 text-sm text-slate-500">Personalize os avisos de estoque do sistema.</p></div>
    <div className="max-w-2xl rounded-xl border border-slate-100 bg-white p-5 shadow-sm"><label htmlFor="limite-estoque" className="block text-sm font-semibold text-slate-800">Avisar quando houver poucas unidades</label><p className="mt-1 text-sm text-slate-500">Produtos com quantidade igual ou abaixo deste valor serão marcados como estoque baixo.</p><div className="mt-4 flex items-center gap-3"><input id="limite-estoque" type="number" min="1" max="9999" step="1" value={limiteEstoqueBaixo} onChange={(event) => onLimiteChange(Math.min(9999, Math.max(1, Number(event.target.value) || 1)))} className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100" /><span className="text-sm text-slate-500">unidades</span></div><p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">As configurações e os {totalProdutos} produtos cadastrados ficam salvos neste navegador.</p></div>
  </section>;
}

export default Settings;
