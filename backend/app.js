const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");

require('dotenv').config()

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;


const apiLimiter = require("./middleware/api-limiter");

const helmet = require("helmet");

const mongoSanitize = require('express-mongo-sanitize');


mongoose.connect('mongodb+srv://'+user+':'+password+'@'+host,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json()); // Transforme le corps de la requête en objet JS

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", apiLimiter, saucesRoutes);
app.use("/api/auth", apiLimiter, userRoutes);

app.use(helmet());

app.use(mongoSanitize());

module.exports = app;
