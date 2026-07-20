export default function criarErro(mensagem, codigoStatus = 500) {
  const erro = new Error(mensagem);
  erro.name = "Erro";
  erro.codigoStatus = codigoStatus;
  return erro;
};