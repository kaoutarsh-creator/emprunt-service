import Emprunt from "../models/Emprunt.js";

export const ajouterEmprunt = async (req, res) => {
  try {
    const { idClient, idLivre, dateEmprunt, dateRetour } = req.body;

    if (!idClient || !idLivre) {
      return res.status(400).json({
        message: "idClient et idLivre sont obligatoires",
      });
    }

    const nouvelEmprunt = new Emprunt({
      idClient,
      idLivre,
      dateEmprunt,
      dateRetour,
    });

    const empruntSauvegarde = await nouvelEmprunt.save();

    return res.status(201).json({
      message: "Emprunt ajouté avec succès",
      data: empruntSauvegarde,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de l'ajout de l'emprunt",
      error: error.message,
    });
  }
};