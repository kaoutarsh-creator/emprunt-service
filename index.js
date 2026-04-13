import express from 'express';
import empruntRoutes from './routes/empruntRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/v1/emprunt', empruntRoutes);

app.listen(3000, () => {
    console.log('Server running...');
});