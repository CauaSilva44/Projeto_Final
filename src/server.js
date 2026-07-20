import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import app from "./app.js";
import conectarDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

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
