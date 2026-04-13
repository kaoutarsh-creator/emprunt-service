import express from 'express';

const router = express.Router();

// ajouter emprunt
router.post('/', (req, res) => {
    const { idClient, idLivre } = req.body;

    res.json({
        message: 'Emprunt ajouté',
        data: { idClient, idLivre }
    });
});

// get emprunts
router.get('/:idClient', (req, res) => {
    const idClient = req.params.idClient;

    res.json({
        message: 'Liste des emprunts',
        data: [
            { idLivre: 1 },
            { idLivre: 2 }
        ]
    });
});

// retour livre
router.post('/retour', (req, res) => {
    const { idClient, idLivre } = req.body;

    res.json({
        message: 'Livre retourné',
        data: { idClient, idLivre }
    });
});

export default router;