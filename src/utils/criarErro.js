export default function criarErro(mensagem, codigoStatus = 500) {
  const erro = new Error(mensagem);
  erro.name = "Error";
  erro.status = codigoStatus;
  erro.codigoStatus = codigoStatus;
  return erro;
}