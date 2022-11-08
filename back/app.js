// REQUIRES //

const express = require('express');
const mongoose = require('mongoose');
const helmet = require("helmet")
const dotenv = require("dotenv");
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();

// MONGOOSE // connection to MongoDB Atlas //
dotenv.config();

mongoose.connect('mongodb+srv://euphoriiah:ichigo123@euphombcluster1.5vhwq6d.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());


//header - Global access to API //
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use('/images', express.static(path.join(__dirname, 'images')));

// Helmet middlware for safe headers //
app.use(helmet());

// ROUTES // 
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
