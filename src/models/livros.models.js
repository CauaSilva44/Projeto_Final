import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é obrigatório."],
      trim: true,
      minlength: [2, "O título deve ter pelo menos 2 caracteres."],
    },

    autor: {
      type: String,
      required: [true, "O autor é obrigatório."],
      trim: true,
    },

    categoria: {
      type: String,
      required: [true, "A categoria é obrigatória."],
      trim: true,
    },

    descricao: {
      type: String,
      trim: true,
      default: "",
    },

    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    anoPublicacao: {
      type: Number,
      min: [1900, "O ano de publicação deve ser maior ou igual a 1900."],
    },

    quantidade: {
      type: Number,
      required: [true, "A quantidade é obrigatória."],
      min: [0, "A quantidade não pode ser negativa."],
      default: 1,
    },

    disponivel: {
      type: Number,
      required: [true, "A quantidade disponível é obrigatória."],
      min: [0, "A quantidade disponível não pode ser negativa."],
      default: 1,
    },

    imagemUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(document, retorno) {
        delete retorno.__v;
        return retorno;
      },
    },
  }
);

const Livro = mongoose.model("Livro", LivroSchema);

export default Livro;
