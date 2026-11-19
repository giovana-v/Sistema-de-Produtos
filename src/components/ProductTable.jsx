import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

export const formatarMoeda = (valor) => Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const obterStatus = (produto, limite = 5) => produto.quantidade <= 0 ? "Sem estoque" : produto.quantidade <= limite ? "Estoque baixo" : "Em estoque";

const estiloStatus = {
  "Em estoque": "bg-green-50 text-green-700",
  "Estoque baixo": "bg-yellow-50 text-yellow-700",
  "Sem estoque": "bg-red-50 text-red-700",
};

function ProductTable({ produtos, limiteEstoqueBaixo = 5, titulo = "Produtos recentes", mostrarLink = true, onEditar, onExcluir }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">{titulo}</h2>
        {mostrarLink && <Link to="/produtos" className="flex min-h-11 shrink-0 items-center text-xs font-semibold text-emerald-800 hover:underline">Ver todos →</Link>}
      </div>
      {produtos.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">Nenhum produto encontrado.</p> : (
        <div role="region" aria-label="Tabela de produtos; deslize horizontalmente para ver todas as colunas" tabIndex={0} className="overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
          <table className="w-full min-w-145 text-left text-xs">
            <thead className="bg-slate-50"><tr>
              <th scope="col" className="px-2 py-3 font-medium text-slate-600">Produto</th>
              <th scope="col" className="px-2 py-3 font-medium text-slate-600">Categoria</th>
              <th scope="col" className="px-2 py-3 font-medium text-slate-600">Quantidade</th>
              <th scope="col" className="px-2 py-3 font-medium text-slate-600">Preço unitário</th>
              <th scope="col" className="px-2 py-3 font-medium text-slate-600">Status</th>
              {(onEditar || onExcluir) && <th scope="col" className="px-2 py-3 font-medium text-slate-600">Ações</th>}
            </tr></thead>
            <tbody>{produtos.map((produto) => {
              const status = obterStatus(produto, limiteEstoqueBaixo);
              return <tr key={produto.id} className="border-t border-slate-100 text-slate-600">
                <td className="whitespace-nowrap px-2 py-3 font-medium text-slate-700">{produto.nome}</td>
                <td className="px-2 py-3">{produto.categoria}</td>
                <td className={`px-2 py-3 ${produto.quantidade === 0 ? "font-semibold text-rose-700" : ""}`}>{produto.quantidade}</td>
                <td className="whitespace-nowrap px-2 py-3">{formatarMoeda(produto.preco)}</td>
                <td className="px-2 py-3"><span className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${estiloStatus[status]}`}>{status}</span></td>
                {(onEditar || onExcluir) && <td className="whitespace-nowrap px-2 py-3">
                  {onEditar && <button type="button" onClick={() => onEditar(produto)} className="mr-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-emerald-200 px-2.5 font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"><Pencil size={14} />Editar</button>}
                  {onExcluir && <button type="button" onClick={() => onExcluir(produto.id)} className="inline-flex min-h-9 items-center rounded-lg px-2 font-semibold text-rose-700 transition-colors hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700">Excluir</button>}
                </td>}
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
