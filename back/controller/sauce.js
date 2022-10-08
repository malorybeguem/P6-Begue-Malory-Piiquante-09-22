const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getSauces = (req, res, next) => {
  Sauce.find()
  .then((sauces) => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}))
};

// SAUCE CREATION //
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

// MODIFY SAUCE //
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.userId !== req.auth.userId) {
          res.status(401).json({
          error: new Error(
              "Vous n'êtes pas le propriétaire de cette sauce."
          ),
          });
        }
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
  
        const sauceObject = req.file
          ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          :
            { ...req.body };
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce mise à jour !" }))
          .catch((error) => res.status(400).json({ error }));
        });
    });
  };
  
  // DELETE SAUCE //
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      if (!sauce) {
        res.status(404).json({ error: new Error("Cette sauce n'existe pas") });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(401).json({
        error: new Error(
            "Vous n'êtes pas le propriétaire de cette sauce."
        ),
        });
      }
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
      });
    });
  };

