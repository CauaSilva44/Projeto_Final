import LivroRepository from "../repositories/livros.repositories.js";
import criarErro from "../utils/criarErro.js";

function montarFiltro({ titulo, autor, categoria, isbn, anoPublicacao, disponivel, qtdMinima }) {
  const filtro = {};

  if (titulo) {
    filtro.titulo = { $regex: titulo.trim(), $options: "i" };
  }

  if (autor) {
    filtro.autor = { $regex: autor.trim(), $options: "i" };
  }

  if (categoria) {
    filtro.categoria = { $regex: categoria.trim(), $options: "i" };
  }

  if (isbn) {
    filtro.isbn = { $regex: isbn.trim(), $options: "i" };
  }

  if (anoPublicacao) {
    filtro.anoPublicacao = Number(anoPublicacao);
  }

  if (disponivel !== undefined) {
    filtro.disponivel = Number(disponivel);
  }

  if (qtdMinima !== undefined) {
    filtro.quantidade = { $gte: Number(qtdMinima) };
  }

  return filtro;
}

async function listarLivros(query = {}) {
  const filtro = montarFiltro(query);
  const pagina = Number(query.pagina) > 0 ? Number(query.pagina) : 1;
  const limite = Number(query.limite) > 0 ? Number(query.limite) : 10;
  const pular = (pagina - 1) * limite;
  const sort = query.ordenar || "titulo";

  const ordem = query.ordem === "desc" ? -1 : 1;

  const [livros, total] = await Promise.all([
    LivroRepository.listarComFiltros(filtro, {
      sort: { [sort]: ordem },
      skip: pular,
      limit: limite,
    }),
    LivroRepository.contar(filtro),
  ]);

  return {
    livros,
    total,
    pagina,
    limite,
    totalPaginas: Math.ceil(total / limite),
  };
}

async function buscarLivroPorId(id) {
  const livro = await LivroRepository.buscarPorId(id);

  if (!livro) {
    throw criarErro("Livro não encontrado.", 404);
  }

  return livro;
}

async function criarLivro(dadosDoLivro) {
  const camposObrigatorios = ["titulo", "autor", "categoria", "quantidade", "disponivel"];

  for (const campo of camposObrigatorios) {
    if (dadosDoLivro[campo] === undefined || dadosDoLivro[campo] === null || dadosDoLivro[campo] === "") {
      throw criarErro(`O campo ${campo} é obrigatório.`, 400);
    }
  }

  if (dadosDoLivro.quantidade < 0 || dadosDoLivro.disponivel < 0) {
    throw criarErro("Quantidade e disponibilidade não podem ser negativas.", 400);
  }

  if (dadosDoLivro.disponivel > dadosDoLivro.quantidade) {
    throw criarErro("A disponibilidade não pode ser maior que a quantidade total.", 400);
  }

  return LivroRepository.criar(dadosDoLivro);
}

async function atualizarLivro(id, dadosAtualizados) {
  const livroExistente = await LivroRepository.buscarPorId(id);

  if (!livroExistente) {
    throw criarErro("Livro não encontrado.", 404);
  }

  const dadosParaAtualizar = { ...dadosAtualizados };

  if (dadosParaAtualizar.quantidade !== undefined && dadosParaAtualizar.quantidade < 0) {
    throw criarErro("Quantidade não pode ser negativa.", 400);
  }

  if (dadosParaAtualizar.disponivel !== undefined && dadosParaAtualizar.disponivel < 0) {
    throw criarErro("Disponibilidade não pode ser negativa.", 400);
  }

  if (
    dadosParaAtualizar.quantidade !== undefined &&
    dadosParaAtualizar.disponivel !== undefined &&
    dadosParaAtualizar.disponivel > dadosParaAtualizar.quantidade
  ) {
    throw criarErro("A disponibilidade não pode ser maior que a quantidade total.", 400);
  }

  if (
    dadosParaAtualizar.quantidade !== undefined &&
    dadosParaAtualizar.disponivel === undefined &&
    livroExistente.disponivel > dadosParaAtualizar.quantidade
  ) {
    throw criarErro("A disponibilidade não pode ser maior que a quantidade total.", 400);
  }

  return LivroRepository.atualizarPorId(id, dadosParaAtualizar);
}

async function deletarLivro(id) {
  const livroExistente = await LivroRepository.buscarPorId(id);

  if (!livroExistente) {
    throw criarErro("Livro não encontrado.", 404);
  }

  await LivroRepository.deletarPorId(id);

  return { message: "Livro removido com sucesso." };
}

const LivroService = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
};

export default LivroService;
