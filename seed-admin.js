import dotenv from "dotenv";
import conectarDB from "./src/config/db.js";
import Usuario from "./src/models/usuario.model.js";

dotenv.config();

async function criarAdmin() {
  try {
    await conectarDB();

    const email = process.env.SEED_ADMIN_EMAIL || "admin@biblioteca.com";
    const senha = process.env.SEED_ADMIN_SENHA || "admin123";
    const nome = process.env.SEED_ADMIN_NOME || "Administrador";

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
    const bcrypt = await import("bcrypt");
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const usuarioExistente = await Usuario.findOne({ email: email.trim().toLowerCase() });

    if (usuarioExistente) {
      console.log("Usuário admin já existe:", usuarioExistente.email);
      process.exit(0);
    }

    const admin = new Usuario({ nome, email: email.trim().toLowerCase(), senhaHash, tipoPerm: "admin" });
    await admin.save();

    console.log("Admin criado com sucesso:", admin.email);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao criar admin:", error.message);
    process.exit(1);
  }
}

criarAdmin();
