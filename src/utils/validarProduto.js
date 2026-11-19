
export function normalizarProduto(produto) {
  return {
    ...produto,
    nome: String(produto.nome ?? "").trim(),
    categoria: String(produto.categoria ?? "").trim()
  };
}

export function validarProduto(produto) {
  if (!produto || typeof produto !== "object" || Array.isArray(produto)) {
    return {
      valido: false,
      erros: {
        produto: "Os dados do produto são inválidos."
      },
      produto: null
    };
  }

  const produtoNormalizado = normalizarProduto(produto);
  const erros = {};

  if (!produtoNormalizado.nome) {
    erros.nome = "O nome é obrigatório.";
  }

  if (!produtoNormalizado.categoria) {
    erros.categoria = "A categoria é obrigatória.";
  }

  const quantidadeTexto = String(produto.quantidade ?? "").trim();
  const quantidadeInformada = quantidadeTexto !== "";
  const quantidade = Number(quantidadeTexto);

  if (!quantidadeInformada) {
    erros.quantidade = "A quantidade é obrigatória.";
  } else if (!Number.isFinite(quantidade)) {
    erros.quantidade = "Informe uma quantidade válida.";
  } else if (!Number.isInteger(quantidade)) {
    erros.quantidade = "A quantidade deve ser um número inteiro.";
  } else if (quantidade < 0) {
    erros.quantidade = "A quantidade não pode ser negativa.";
  }

  const precoTexto = String(produto.preco ?? "").trim();
  const precoInformado = precoTexto !== "";
  const preco = Number(precoTexto);

  if (!precoInformado) {
    erros.preco = "O preço é obrigatório.";
  } else if (!Number.isFinite(preco)) {
    erros.preco = "Informe um preço válido.";
  } else if (preco < 0) {
    erros.preco = "O preço não pode ser negativo.";
  }

  return {
    valido: Object.keys(erros).length === 0,
    erros,
    produto: {
      ...produtoNormalizado,
      quantidade,
      preco
    }
  };
}
