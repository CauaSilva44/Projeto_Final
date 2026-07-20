import dotenv from "dotenv";
import app from "./app.js";
import conectarDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

try {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`Conectado com a porta ${PORT} com sucesso!`);
  });
} catch (error) {
  console.log("Erro ao iniciar a aplicação: ", error.message);

  process.exit(1);
};
