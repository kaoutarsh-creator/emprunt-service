import mongoose from "mongoose";

const empruntSchema = new mongoose.Schema(
  {
    idClient: {
      type: String,
      required: true,
      trim: true,
    },
    idLivre: {
      type: String,
      required: true,
      trim: true,
    },
    dateEmprunt: {
      type: Date,
      default: Date.now,
    },
    dateRetour: {
      type: Date,
      default: null,
    },
    statut: {
      type: String,
      enum: ["en cours", "retourne"],
      default: "en cours",
    },
  },
  {
    timestamps: true,
  }
);

const Emprunt = mongoose.model("Emprunt", empruntSchema);

export default Emprunt;