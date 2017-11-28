//mongodb://<dbuser>:<dbpassword>@ds121906.mlab.com:21906/wallet-dev

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const key = require("./config");

mongoose.connect(key.mongoURI);

const app = express();

require("./routes/authRoutes")(app);
const PORT = process.env.NODE_ENV || 8888;

app.listen(PORT);
