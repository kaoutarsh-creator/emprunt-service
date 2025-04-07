import express from "express";
import { ajouterEmprunt } from "../controllers/empruntController.js";

const router = express.Router();

router.post("/emprunt", ajouterEmprunt);

export default router;