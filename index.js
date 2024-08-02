import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";

//Connect to Database
await mongoose.connect(process.env.MONGO_URL);
console.log('Database connected successfully')

//creating Express app
const app = express()

//Applying middleware
app.use(express.json());


app.use("/api/v1", userRouter);

//Listening to incoming messsages
const port = process.env.Port || 7000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

