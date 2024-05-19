import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import connectDB from './config/db.js'

/* ROUTES IMPORTS */
import clientRoutes from './routes/clientRoutes.js'
import generalRoutes from './routes/generalRoutes.js'
import managementRoutes from './routes/managementRoutes.js'
import salesRoutes from './routes/salesRoutes.js'

//data imports
import User from './models/userModel.js'
import Product from './models/productModel.js'
import ProductStat from './models/productStat.js'
import Transaction from './models/transactionModel.js'
import { dataUser, dataProduct, dataProductStat, dataTransaction } from './data/index.js'

/* CONFIGURATION */
dotenv.config()
const PORT = process.env.PORT || 5000

connectDB();

const app = express()

// Function to inject dataUser into the database
const injectDataUser = async () => {
    try {
      const existingUsers = await User.find({});
  
      if (existingUsers.length === 0) {
        const createdUsers = await User.insertMany(dataUser);
        console.log('Data has been injected successfully');
      } else {
        console.log('Data already exists, skipping injection');
      }
    } catch (error) {
      console.error(`Failed to inject data: ${error}`);
    }
};

// Function to inject dataProduct into the database
const injectDataProduct = async () => {
  try {
    const existingProducts = await Product.find({});

    if (existingProducts.length === 0) {
      const createdProducts = await Product.insertMany(dataProduct);
      console.log('Product data has been injected successfully');
    } else {
      console.log('Product data already exists, skipping injection');
    }
  } catch (error) {
    console.error(`Failed to inject product data: ${error}`);
  }
};

// Function to inject dataProductStat into the database
const injectDataProductStat = async () => {
  try {
    const existingProductStats = await ProductStat.find({});

    if (existingProductStats.length === 0) {
      const createdProductStats = await ProductStat.insertMany(dataProductStat);
      console.log('Product stat data has been injected successfully');
    } else {
      console.log('Product stat data already exists, skipping injection');
    }
  } catch (error) {
    console.error(`Failed to inject product stat data: ${error}`);
  }
};

// Function to inject dataTransaction into the database
const injectDataTransaction = async () => {
  try {
    const existingTransactions = await Transaction.find({});

    if (existingTransactions.length === 0) {
      const createdTransactions = await Transaction.insertMany(dataTransaction);
      console.log('Transaction data has been injected successfully');
    } else {
      console.log('Transaction data already exists, skipping injection');
    }
  } catch (error) {
    console.error(`Failed to inject transaction data: ${error}`);
  }
};

// Call the functions to inject data
injectDataUser();
injectDataProduct();
injectDataProductStat();
injectDataTransaction();

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


/* Routes */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);    
});

