import express from "express";
import mongoose from "mongoose";

//Connect to Database
await mongoose.connect(process.env.MONGO_URL);
console.log('Database connected successfully')

//creating Express app
const app = express()



//Listening to incoming messsages
const port = process.env.Port || 7000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

