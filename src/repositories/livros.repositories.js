import Livro from "../models/livros.models.js";

async function criar(dadosDoLivro) {
  return Livro.create(dadosDoLivro);
}

async function buscarPorId(id) {
  return Livro.findById(id);
}

async function listarComFiltros(filtro, opcaoDeBusca) {
  return Livro.find(filtro, null, opcaoDeBusca);
}

async function contar(filtro) {
  return Livro.countDocuments(filtro);
}

async function atualizarPorId(id, dadosAtualizados) {
  return Livro.findByIdAndUpdate(id, dadosAtualizados, {
    new: true,
    runValidators: true,
  });
}

async function deletarPorId(id) {
  return Livro.findByIdAndDelete(id);
}

const LivroRepository = {
  criar,
  buscarPorId,
  listarComFiltros,
  contar,
  atualizarPorId,
  deletarPorId,
};

export default LivroRepository;
