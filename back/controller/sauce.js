const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}))
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes : 0,           
      dislikes : 0,        
      usersLiked : [],     
      usersDisliked : [], 
  });
  sauce.save()
  .then(() => res.status(201).json({message: "Nouvelle sauce ajoutée avec succès !"}))
  .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => res.status(200).json(sauce))
  .catch((error) => res.status(400).json({ error }));
};

