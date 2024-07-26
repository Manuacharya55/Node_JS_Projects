import express from "express";
import connectDB from "./db/index.js";
import taskRouter from "./router/task.router.js";

const app = express();
import bodyParser from "body-parser";

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

connectDB()
  .then(() => {
    app.listen(4000, () => {
      console.log("running at port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  
app.get("/", (req, res) => {
  res.redirect("/api/v1/task");
});

app.use("/api/v1", taskRouter);
