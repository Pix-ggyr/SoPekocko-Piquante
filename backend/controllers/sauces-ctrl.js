//Here goes the sauce controller
const Sauce = require('../models/sauces-mod');
const fs = require('fs');

//find all sauces + Promise
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
      .then((sauces) => {res.status(200).json(sauces);})
      .catch((error) => {res.status(400).json({error: error});});
};

//find sauce + Promise
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
      .then((sauce) => {res.status(200).json(sauce);})
      .catch((error) => {res.status(404).json({error: error});});
};

//delete sauce + Promise
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Sauce.deleteOne({ _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Your sauce is gone !'}))
                  .catch(error => res.status(400).json({ error }));
          });
      })    
      .catch((error) => {res.status(500).json({error: error});});
};

