import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import cors from "cors";
import { restartServer } from "./restart_server.js";
import userRouter from "./routes/user.js";


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
    tags:['auth'],
    mongooseModels: mongoose.modelNames()
})

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "UP" });
  });
  
app.use("/api/v1", userRouter);

const reboot = async () => {
    setInterval(restartServer, process.env.INTERVAL)
    }

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/')); 

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
    
 

