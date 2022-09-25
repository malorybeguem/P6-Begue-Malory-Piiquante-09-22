const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config({path: '.env'});


const app = express();

module.exports = app;