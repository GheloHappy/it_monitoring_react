import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(Router);

app.listen(4999, () => {
    console.log("SERVER RUNNING! port 4999");
});

// import express from "express";

// const app = express();
// app.get("/", (req, res) => {
//     res.send("app is running")
// });

// app.listen(4999);
