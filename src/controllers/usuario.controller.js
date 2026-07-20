import UsuarioService from "../services/usuario.service.js";

async function perfil(req, res, next) {
  try {
    const usuario = await UsuarioService.buscarPerfil(req.usuario.id);

    return res.status(200).json({ usuario });
  } catch (error) {

    return next(error);
  };
};


async function listar(req, res, next) {
  try {
    const usuarios = await UsuarioService.listarUsuarios();

    return res.status(200).json({ usuarios });
  } catch (error) {

    return next(error);
  };
};


async function atualizarPerfil(req, res, next) {
  try {
    const usuario = await UsuarioService.atualizarPerfil(req.usuario.id, req.body);

    return res.status(200).json({ usuario });
  } catch (error) {

    return next(error);
  };
};

async function removerMinhaConta(req, res, next) {
  try {
    const resultado = await UsuarioService.removerMinhaConta(req.usuario.id);

    return res.status(200).json(resultado);
  } catch (error) {

    return next(error);
  };
};

const UsuarioController = {
  perfil,
  listar,
  atualizarPerfil,
  removerMinhaConta,
};

export default UsuarioController;
