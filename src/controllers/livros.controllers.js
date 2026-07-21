import LivroService from "../services/livros.service.js";

async function listarLivros(req, res, next) {
  try {
    const resultado = await LivroService.listarLivros(req.query);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function buscarLivroPorId(req, res, next) {
  try {
    const livro = await LivroService.buscarLivroPorId(req.params.id);
    return res.status(200).json({ livro });
  } catch (error) {
    return next(error);
  }
}

async function criarLivro(req, res, next) {
  try {
    const livro = await LivroService.criarLivro(req.body);
    return res.status(201).json({ livro });
  } catch (error) {
    return next(error);
  }
}

async function atualizarLivro(req, res, next) {
  try {
    const livro = await LivroService.atualizarLivro(req.params.id, req.body);
    return res.status(200).json({ livro });
  } catch (error) {
    return next(error);
  }
}

async function deletarLivro(req, res, next) {
  try {
    const resultado = await LivroService.deletarLivro(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

const LivroController = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
};

export default LivroController;
