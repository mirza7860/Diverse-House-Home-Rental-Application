import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import listRoutes from "./routes/List.js";
//  Intialization

const app = express();

//  Configuration

dotenv.config();

//  Middleware

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//  Routes

app.use("/auth", authRoutes);
app.use("/properties", listRoutes);

//  Intializing server with dtatabase

mongoose
  .connect(process.env.MONGO_URi, {
    dbName: "Home_For_Rent",
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`SERVER LISTENING AT PORT ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`Server Error Log: ${err}`));
