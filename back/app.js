//Tools initializations for the app//
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config({path: '.env'});


const app = express();

// HELMET - protection again web vulnerability //
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
  }));
  
  app.use(express.json());

// MongoDb Connect status //
  mongoose.connect("mongodb+srv://euphoriiah:<ichigo123>@cluster0.vizbtkm.mongodb.net/test",
{ useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connecté !"))
.catch(() => console.log(("Connexion à MongoDB échouée. ")));

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
  
  app.use(cors());
  
  app.use('/api/auth', userRoutes);
  
  app.use('/api/sauces', sauceRoutes);
  
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
module.exports = app;