import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import cors from "cors";
import { restartServer } from "./restart_server.js";
import errorHandler from "errorhandler";
import userRouter from "./routes/user.js";
import farmerRouter from "./routes/farmer_profile_route.js";
import buyerRouter from "./routes/buyer_profile_route.js";
import farmInfoRouter from "./routes/farm_info_route.js";
import listingsRouter from "./routes/listings.js";
import savedListingsRouter from "./routes/savedlistings.js";




//Connect to database
await mongoose.connect(process.env.MONGO_URL)
console.log("Database is connected")

//creating Express app
const app = express()

//Applying middleware
app.use(express.json());
app.use(cors({credentials: true, origin: '*'}));

expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags:['auth', 'profiles', 'information', 'listings', 'saved listings', 'orders', 'messages'],
    mongooseModels: mongoose.modelNames()
})

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "UP" });
  });
  
  //Use routers
app.use("/api/v1", userRouter);
app.use("/api/v1", farmerRouter)
app.use("/api/v1", buyerRouter)
app.use("/api/v1", farmInfoRouter)
app.use("/api/v1", listingsRouter)
app.use("/api/v1", savedListingsRouter)
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/')); 
app.use(errorHandler({ log: false }));




const reboot = async () => {
    setInterval(restartServer, process.env.INTERVAL)
    }


//Listening to incoming messsages
const PORT = process.env.PORT || 7000
// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// });
app.listen(PORT, () => {
    reboot().then(() => {
        console.log(`Server Restarted`);
      });
      console.log(`Server is connected to Port ${PORT}`);
})
// .catch((err) => {
//     console.log(err);
//     process.exit(-1);
//   });
    
 

