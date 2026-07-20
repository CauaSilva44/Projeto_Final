import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usuarioRepository from '../repositories/usuario.repositories.js'; 
import criarErro from '../utils/criarErro.js';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const JWT_EXPIRES_IN = '1d';

async function cadastrar({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    throw criarErro("Nome, email e senha são obrigatórios.", 409);
  }

  validarSenha(senha);

  const emailNormalizado = email.trim().toLowerCase();

  const usuarioExistente = await usuarioRepository.buscarPorEmail(emailNormalizado);

  if (usuarioExistente) {
    throw criarErro("Email já cadastrado.", 409);
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || SALT_ROUNDS);

  const senhaHash = await bcrypt.hash(senha, saltRounds);

  const usuarioCriado = await usuarioRepository.criar({
    nome: nome.trim(),
    email: emailNormalizado,
    senhaHash,
  });

  return montarUsuarioSeguro(usuarioCriado);
}

async function login({ email, senha }) {
  if (!email || !senha) {
    throw criarErro("Email e senha são obrigatórios.", 400);
  }

  const usuario = await usuarioRepository.buscarPorEmail(email, true);

  if (!usuario) {
    throw criarErro("Email ou senha incorretos.", 401);
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaCorreta) {
    throw criarErro("Email ou senha incorretos.", 401);
  }

  return montarUsuarioSeguro(usuario);
};

async function buscarPerfil(id) {
  const usuario = await usuarioRepository.buscarPorId(id);

  if (!usuario) {
    throw criarErro("Usuário não encontrado.", 404);
  }

  return montarUsuarioSeguro(usuario);
}

function validarSenha(senha) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(senha)) {
    throw criarErro(
      "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      400
    );
  }
}

function montarUsuarioSeguro(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
}

function gerarToken(usuario) {
  const payload = { id: usuario.id, email: usuario.email };
  const opcoesDoToken = { expiresIn: JWT_EXPIRES_IN };

  const token = jwt.sign(payload, process.env.JWT_SECRET || JWT_SECRET, opcoesDoToken);
  return token;
}

const UsuarioService = {
  cadastrar,
  login,
  buscarPerfil,
  gerarToken,
};

export default UsuarioService;