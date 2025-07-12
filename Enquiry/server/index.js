import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import enquiryRoutes from "./App/Routes/web/enquiryRoutes.js";
import cors from "cors";

dotenv.config();

let app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DBURL).then(() => {
  console.log("MongoDB connected successfully");
});

app.use("/api/web/enquiry", enquiryRoutes);

app.listen(8000);
