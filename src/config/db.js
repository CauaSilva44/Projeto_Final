import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI;

async function conectarDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI não configurado no .env");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Banco de dados conectado com sucesso!");
  } catch (erro) {
    console.log(`Erro ao se conectar com o banco de dados: ${erro.message}`);
    throw erro;
  }
};

export default conectarDB;
