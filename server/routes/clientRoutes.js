import express from 'express'
import { getProducts, getCustomers, getTransactions } from '../controllers/clientController.js'

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/tranactions", getTransactions);

export default router;