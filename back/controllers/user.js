const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// LOGIN PARAMS - SUCCESS - SUCCESS MESSAGE //
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        })

        user.save()
        .then(() => res.status(201).json({ message: "Compte créé avec succès !"}))
        .catch((error) => res.status(400).json({error}));
    })
    .catch((error) => res.status(500).json({message: error}));
};

// LOGIN PARAMS - FAILED - MESSAGE ERROR //
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json( {message: "Identifiants incorrects"} )
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
                if(!valid){
                    return res.status(401).json({message: "Identifiants incorrects"})
                } else {
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({userId: user._id}, process.env.TOKEN, {expiresIn: "24h"})
                    });
                };
            })
        }
    })
    .catch(error => res.status(500).json({error}));
}