import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/inventory";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const produtosIniciais = [
  { id: 1, nome: "Café Especial 250g", categoria: "Alimentos", quantidade: 15, preco: 18.9 },
  { id: 2, nome: "Fone Bluetooth", categoria: "Eletrônicos", quantidade: 8, preco: 129.9 },
  { id: 3, nome: "Camiseta Oversized", categoria: "Roupas", quantidade: 5, preco: 69.9 },
  { id: 4, nome: "Mochila Casual", categoria: "Acessórios", quantidade: 0, preco: 149.9 },
  { id: 5, nome: "Caneca Personalizada", categoria: "Casa", quantidade: 20, preco: 32.9 },
];

function carregarProdutos() {
  try {
    const salvos = JSON.parse(localStorage.getItem("stockwise-produtos"));
    if (!Array.isArray(salvos)) return produtosIniciais;
    return salvos.map((produto) => ({
      ...produto,
      preco: typeof produto.preco === "string" ? Number(produto.preco.replace(/[^\d,.-]/g, "").replace(",", ".")) : Number(produto.preco),
      quantidade: Number(produto.quantidade),
    }));
  } catch {
    return produtosIniciais;
  }
}

function App() {
  const [produtos, setProdutos] = useState(carregarProdutos);
  const [busca, setBusca] = useState("");
  const [limiteEstoqueBaixo, setLimiteEstoqueBaixo] = useState(() => Number(localStorage.getItem("stockwise-limite")) || 5);

  useEffect(() => localStorage.setItem("stockwise-produtos", JSON.stringify(produtos)), [produtos]);
  useEffect(() => localStorage.setItem("stockwise-limite", String(limiteEstoqueBaixo)), [limiteEstoqueBaixo]);

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    if (!termo) return produtos;
    return produtos.filter((produto) => `${produto.nome} ${produto.categoria}`.toLocaleLowerCase("pt-BR").includes(termo));
  }, [produtos, busca]);

  function salvarProduto(produto) {
    setProdutos((atuais) => produto.id ? atuais.map((item) => item.id === produto.id ? produto : item) : [...atuais, { ...produto, id: Date.now() }]);
  }

  function excluirProduto(id) {
    setProdutos((atuais) => atuais.filter((produto) => produto.id !== id));
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 md:flex-row">
      <a href="#conteudo-principal" className="sr-only z-50 rounded-md bg-white p-3 text-teal-950 focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Pular para o conteúdo</a>
      <Sidebar />
      <main id="conteudo-principal" className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8"><Header busca={busca} onBusca={setBusca} /></header>
        <div className="p-4 sm:p-5 lg:px-8 lg:py-6">
          <Routes>
            <Route path="/" element={<Dashboard produtos={produtosFiltrados} limiteEstoqueBaixo={limiteEstoqueBaixo} />} />
            <Route path="/produtos" element={<Products produtos={produtosFiltrados} onSalvar={salvarProduto} onExcluir={excluirProduto} limiteEstoqueBaixo={limiteEstoqueBaixo} />} />
            <Route path="/categorias" element={<Categories produtos={produtosFiltrados} />} />
            <Route path="/estoque" element={<Inventory produtos={produtosFiltrados} limiteEstoqueBaixo={limiteEstoqueBaixo} onSalvar={salvarProduto} />} />
            <Route path="/relatorios" element={<Reports produtos={produtosFiltrados} limiteEstoqueBaixo={limiteEstoqueBaixo} />} />
            <Route path="/configuracoes" element={<Settings limiteEstoqueBaixo={limiteEstoqueBaixo} onLimiteChange={setLimiteEstoqueBaixo} totalProdutos={produtos.length} />} />
            <Route path="*" element={<div className="rounded-xl bg-white p-8"><h1 className="text-xl font-bold">Página não encontrada</h1><p className="mt-2 text-slate-500">Use o menu para voltar a uma área do sistema.</p></div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
