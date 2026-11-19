import StatCard from "../components/StatCard";
import ProductTable from "../components/ProductTable";
import TipOfTheDay from "../components/TipOfTheDay";
import StockByCategory from "../components/StockByCategory";

function Dashboard({ produtos, limiteEstoqueBaixo }) {
  const unidades = produtos.reduce((total, produto) => total + Number(produto.quantidade || 0), 0);
  const semEstoque = produtos.filter((produto) => produto.quantidade <= 0).length;
  const baixo = produtos.filter((produto) => produto.quantidade > 0 && produto.quantidade <= limiteEstoqueBaixo).length;
  const valorTotal = produtos.reduce((total, produto) => total + Number(produto.preco || 0) * Number(produto.quantidade || 0), 0);
  const recentes = [...produtos].slice(-5).reverse();

  return <section className="flex w-full min-w-0 flex-col gap-5">
    <div><h1 className="text-2xl font-bold tracking-tight text-slate-800">Olá, Giovana!</h1><p className="mt-1 text-sm text-slate-500">Aqui está o resumo atual do seu estoque.</p></div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard titulo="Produtos cadastrados" valor={produtos.length} variacao={`${unidades} unidades no total`} />
      <StatCard titulo="Produtos em estoque" valor={produtos.length - semEstoque} variacao="com pelo menos uma unidade" />
      <StatCard titulo="Estoque baixo" valor={baixo + semEstoque} variacao={`${semEstoque} sem estoque`} />
      <StatCard titulo="Valor total do estoque" valor={valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} variacao="valor estimado dos itens" />
    </div>
    <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(260px,1fr)]">
      <ProductTable produtos={recentes} titulo="Produtos recentes" limiteEstoqueBaixo={limiteEstoqueBaixo} />
      <div className="flex min-w-0 flex-col gap-4"><StockByCategory produtos={produtos} /><TipOfTheDay /></div>
    </div>
  </section>;
}

export default Dashboard;
