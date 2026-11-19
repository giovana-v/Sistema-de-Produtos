import { useState } from "react";
import { Plus, X } from "lucide-react";
import ProductTable from "../components/ProductTable";
import { validarProduto } from "../utils/validarProduto";

const campo =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";
const produtoVazio = { nome: "", categoria: "", quantidade: "", preco: "" };

function Products({ produtos, onSalvar, onExcluir, limiteEstoqueBaixo }) {
  const [formAberto, setFormAberto] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState(produtoVazio);
  const [erros, setErros] = useState({});

  function abrirCadastro(produto = produtoVazio) {
    setProdutoAtual({
      ...produto,
      quantidade: String(produto.quantidade ?? ""),
      preco: String(produto.preco ?? ""),
    });
    setErros({});
    setFormAberto(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const resultado = validarProduto(produtoAtual);

    if (!resultado.valido) {
      setErros(resultado.erros);
      return;
    }

    onSalvar(resultado.produto);

    setFormAberto(false);
    setProdutoAtual(produtoVazio);
    setErros({});
  }

  function excluir(id) {
    const item = produtos.find((produto) => produto.id === id);
    if (item && window.confirm(`Excluir “${item.nome}” do cadastro?`))
      onExcluir(id);
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Cadastre e mantenha seus produtos e quantidades atualizados.
          </p>
        </div>
        <button
          type="button"
          onClick={() => (formAberto ? setFormAberto(false) : abrirCadastro())}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
            formAberto
              ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              : "bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow"
          }`}
        >
          {formAberto ? <X size={18} /> : <Plus size={18} />}
          {formAberto ? "Fechar formulário" : "Adicionar produto"}
        </button>
      </div>

      {formAberto && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
        >
          <h2 className="mb-4 text-base font-bold text-slate-800">
            {produtoAtual.id ? "Editar produto" : "Novo produto"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-slate-600">
              Nome
              <input
                autoFocus
                className={`${campo} mt-1 font-normal`}
                value={produtoAtual.nome}
                onChange={(e) =>
                  setProdutoAtual({ ...produtoAtual, nome: e.target.value })
                }
                maxLength={80}
                required
              />
              {erros.nome && (
                <p className="mt-1 text-sm font-normal text-rose-700">
                  {erros.nome}
                </p>
              )}
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Categoria
              <input
                className={`${campo} mt-1 font-normal`}
                value={produtoAtual.categoria}
                onChange={(e) =>
                  setProdutoAtual({
                    ...produtoAtual,
                    categoria: e.target.value,
                  })
                }
                maxLength={50}
                required
              />
              {erros.categoria && (
                <p className="mt-1 text-sm font-normal text-rose-700">
                  {erros.categoria}
                </p>
              )}
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Quantidade
              <input
                className={`${campo} mt-1 font-normal`}
                type="number"
                min="0"
                step="1"
                value={produtoAtual.quantidade}
                onChange={(e) =>
                  setProdutoAtual({
                    ...produtoAtual,
                    quantidade: e.target.value,
                  })
                }
                required
              />
              {erros.quantidade && (
                <p className="mt-1 text-sm font-normal text-rose-700">
                  {erros.quantidade}
                </p>
              )}
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Preço unitário (R$)
              <input
                className={`${campo} mt-1 font-normal`}
                type="number"
                min="0"
                step="0.01"
                value={produtoAtual.preco}
                onChange={(e) =>
                  setProdutoAtual({ ...produtoAtual, preco: e.target.value })
                }
                required
              />
              {erros.preco && (
                <p className="mt-1 text-sm font-normal text-rose-700">
                  {erros.preco}
                </p>
              )}
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="min-h-10 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {produtoAtual.id ? "Salvar alterações" : "Salvar produto"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormAberto(false);
                setProdutoAtual(produtoVazio);
                setErros({});
              }}
              className="min-h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <ProductTable
        produtos={produtos}
        titulo={`Lista de produtos (${produtos.length})`}
        mostrarLink={false}
        limiteEstoqueBaixo={limiteEstoqueBaixo}
        onEditar={abrirCadastro}
        onExcluir={excluir}
      />
    </section>
  );
}

export default Products;
