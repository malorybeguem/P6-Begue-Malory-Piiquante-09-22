//REQUIRES//
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoMask = require('mongo-mask');
const User = require('../models/user');

// SIGNUP //
exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10) // Hashing and salting the password //
    .then(hash => {
        const user = new User({
            email:req.body.email,
            password: hash
        }); // Create new user //
        user.save() // Save user in DB //
            .then(()=>res.status(201).json({ message : 'utilisateur crée !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//LOGIN//
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Finding the existing user in DB //
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Utilisateur non trouvé !' }); // Return error if user is not found //
        }
        bcrypt.compare(req.body.password, user.password) // Compare the hashed tryed password to the hashed stored password //
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: error}); // Return error if paswwords don't match //
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };