import { Router } from "express";

import UsuarioController from "../controllers/usuario.controller.js";

import autenticar from "../middlewares/autenticacao.middlewares.js";
const router = Router();


router.use(autenticar);

router.get("/perfil", UsuarioController.perfil);

router.patch("/perfil", UsuarioController.atualizarPerfil);

router.delete("/perfil", UsuarioController.removerMinhaConta);

export default router;
