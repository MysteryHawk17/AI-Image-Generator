import  express  from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./mongodb/connect.js";
import * as model from "./mongodb/models/post.js"
import dalleRoutes from "./routes/dalleRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import bodyParser from "body-parser";

dotenv.config();

const app=express();
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json({limit:"50mb"}))
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/dalle",dalleRoutes)
const port=process.env.PORT||5000

app.get("/",(req,res)=>{
    res.send("<h1>Hello From the server side</h1>");
}) 

try {
   
    connectDB(process.env.MONGO_URI);
    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`);
    })
} catch (error) {
    console.log(error);
}

