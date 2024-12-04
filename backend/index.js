const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const personRoutes = require("./routes/person");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/personDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/person", personRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
