const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

module.exports = app;