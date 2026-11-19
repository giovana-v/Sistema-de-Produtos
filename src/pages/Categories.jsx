import { Link } from "react-router-dom";
import { formatarMoeda } from "../components/ProductTable";

function Categories({ produtos }) {
  const grupos = Object.values(produtos.reduce((resultado, produto) => {
    const nome = produto.categoria || "Sem categoria";
    if (!resultado[nome]) resultado[nome] = { nome, produtos: 0, unidades: 0, valor: 0 };
    resultado[nome].produtos += 1;
    resultado[nome].unidades += Number(produto.quantidade || 0);
    resultado[nome].valor += Number(produto.preco || 0) * Number(produto.quantidade || 0);
    return resultado;
  }, {})).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  return <section className="flex flex-col gap-5"><div><h1 className="text-2xl font-bold text-slate-800">Categorias</h1><p className="mt-1 text-sm text-slate-500">Visão geral das categorias presentes nos seus produtos.</p></div>
    {grupos.length === 0 ? <div className="rounded-xl bg-white p-8 text-center"><p className="text-sm text-slate-500">Nenhuma categoria cadastrada ainda.</p><Link to="/produtos" className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline">Cadastrar produto</Link></div> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{grupos.map((grupo) => <article key={grupo.nome} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold text-slate-800">{grupo.nome}</h2><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-500">Produtos</dt><dd className="mt-1 font-semibold">{grupo.produtos}</dd></div><div><dt className="text-slate-500">Unidades</dt><dd className="mt-1 font-semibold">{grupo.unidades}</dd></div><div className="col-span-2"><dt className="text-slate-500">Valor em estoque</dt><dd className="mt-1 font-semibold">{formatarMoeda(grupo.valor)}</dd></div></dl></article>)}</div>}
  </section>;
}

export default Categories;
