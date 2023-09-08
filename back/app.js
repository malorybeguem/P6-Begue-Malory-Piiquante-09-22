// REQUIRES //
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();

dotenv.config();

// MONGO DB-ACCESS //
mongoose.connect('xxx',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//header d'accès global à l'API //
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use('/images', express.static(path.join(__dirname, 'images')));

// EXPRESS LIMITER // TO AVOID TOO MANY CONNEXION ATTEMPTS //
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
});

app.use(limiter);

//HELMET SECURITY//
app.use(helmet());

// ROUTES // 
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
