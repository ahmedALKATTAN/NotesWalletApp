const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routerUrls = require("./routes/route");
const cors = require("cors");
const https = require("https");
const bodyParser = require("body-parser");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

/// connect to the data base mongodb
mongoose
  .connect("mongodb://localhost:27017/08-12-2021", {
    useNewUrlParser: true,
  })
  .then(console.log("data base is connected "))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());
app.use("/app", routerUrls);

app.listen(4000, () => console.log("Server Is running on port 4000"));
