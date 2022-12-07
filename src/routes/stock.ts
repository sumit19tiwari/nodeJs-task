/** source/routes/posts.ts */
import express from 'express';
import stockController from '../controller/stock-info';
const router = express.Router();

router.get('/get-stock/:sku(*)',[stockController.getStock]);

export default router;