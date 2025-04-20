import express from "express";
import { ajouterEmprunt } from "../controllers/empruntController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// emprunt 
router.post("/emprunt", protect, ajouterEmprunt);

//  profile 
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

export default router;