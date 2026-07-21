import { Router } from "express";

import LivroController from "../controllers/livros.controllers.js";
import autenticar from "../middlewares/autenticacao.middlewares.js";
import criarErro from "../utils/criarErro.js";

const router = Router();

function somenteAdmin(req, res, next) {
  if (req.usuario?.tipoPerm !== "admin") {
    return next(criarErro("Acesso negado. Apenas administradores podem realizar esta ação.", 403));
  }

  return next();
}

router.get("/", LivroController.listarLivros);
router.get("/:id", LivroController.buscarLivroPorId);

router.use(autenticar);
router.post("/", somenteAdmin, LivroController.criarLivro);
router.patch("/:id", somenteAdmin, LivroController.atualizarLivro);
router.delete("/:id", somenteAdmin, LivroController.deletarLivro);

export default router;
