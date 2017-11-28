const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const key = require("./config");

mongoose.connect(key.mongoURI);
require("./models/User");
require("./models/Receipt");

const app = express();
app.use(bodyParser.json());
require("./routes/authRoutes")(app);
require("./routes/transferRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.NODE_ENV || 8888;

app.listen(PORT);
