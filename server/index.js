import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import transactionRoutes from "./routes/transaction.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common)"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
// * step 1
app.use("/transaction", transactionRoutes);

// mongoose setup
// const PORT = process.env.PORT || 9000;
const PORT = Number(process.env.PORT) || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // app.listen(PORT, () => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(` ## Server is running on port ${PORT}`);
    });
    // await mongoose.connection.db.dropDatabase()
    // * only add it once then comment it out
    // KPI.insertMany(kpis)
    // Product.insertMany(products)
    // * step 2 & step 3: which are model and data
    // Transaction.insertMany(transactions);
    // * step 4: insert and
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });
