import express from "express";

import usuarioRoutes from "./routes/usuario.routes.js";

import authRoutes from "./routes/auth.routes.js";
import livrosRoutes from "./routes/livros.routes.js";

import criarErro from "./utils/criarErro.js";

import erroMiddleware from "./middlewares/erro.midleware.js";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  return res.status(200).json({message: "Boilerplate API MVC está rodando."});
});
app.use("/auth", authRoutes);

app.use("/usuarios", usuarioRoutes);
app.use("/livros", livrosRoutes);

app.use((req, res, next) => {
  return next(criarErro("Rota não encontrada.", 404));
});

app.use(erroMiddleware);

export default app;
