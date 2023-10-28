import express from "express";
import mongoose from "mongoose";
import router from "./router/routes.js";
import "dotenv/config";
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
(async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected!");
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    })
    .catch((error) => console.log(error.message));
})();



app.use("/users", router);


process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });