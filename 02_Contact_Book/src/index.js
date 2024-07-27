import express from "express"
import bodyParser from "body-parser"
import connectDB from "./db/index.js";
import contactRouter from "./routers/contact.router.js";
import { imagesDir } from "./middleware/multer.middleware.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api/images", express.static(imagesDir));

connectDB().then(()=>{
    app.listen(4000,()=>{
        console.log("server started")
       
    })
}).catch((err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.send("hi")
})

app.use("/api/v1",contactRouter);
