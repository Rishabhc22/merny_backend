const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./routes/index")(app);

module.exports = app;
