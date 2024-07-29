import express from "express";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser"
import userRouter from "./router/user.routes.js"
import blogRouter from "./router/blog.routes.js";
import { imagesDir } from "./middleware/multer.middleware.js"
const app = express();


app.set("view engine","ejs");
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/images", express.static(imagesDir));

connectDB()
.then(() => {
  app.listen(4000, () => {
    console.log("Server Started");
  });
})
.catch((err) => {
  console.log(err)
});


app.get("/",(req,res)=>{
    res.send("hi")
});

app.use("/blogify",userRouter)
app.use("/blogify",blogRouter)


