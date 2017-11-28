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

const PORT = process.env.NODE_ENV || 8888;

app.listen(PORT);
