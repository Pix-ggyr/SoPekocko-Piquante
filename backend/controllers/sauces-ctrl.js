// Here goes the sauce controller
const fs = require('fs');
const Sauce = require('../models/sauces-mod');

// create sauce + Promise
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // eslint-disable-next-line no-underscore-dangle
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce.save()
    .then(() => { res.status(201).json({ message: 'Your sauce has been saved !' }); })
    // eslint-disable-next-line object-shorthand
    .catch((error) => { res.status(400).json({ error: error }); });
};

// find all sauces + Promise
exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => { res.status(200).json(sauces); })
    .catch((error) => { res.status(400).json({ error }); });
};

// find sauce + Promise
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => { res.status(200).json(sauce); })
    .catch((error) => { res.status(404).json({ error }); });
};

// update sauce and image + Promise
exports.updateSauce = (req, res) => {
  const sauceObject = req.file
    ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => { res.status(201).json({ message: 'Your sauce has been updated !' }); })
            .catch((error) => { res.status(400).json({ error }); });
        });
      })
      .catch((error) => { res.status(500).json({ error }); });
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => { res.status(201).json({ message: 'Your sauce has been updated !' }); })
      .catch((error) => { res.status(400).json({ error }); });
  }
};

// delete sauce + Promise
exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Your sauce is gone !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => { res.status(500).json({ error }); });
};

// Like or dislike system
/* eslint-disable no-console */
exports.sauceNotation = (req, res) => {
  switch (req.body.like) {
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find((user) => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id,
            })
              .then(() => { res.status(201).json({ message: 'Your feedback has been added !' }); })
              .catch((error) => { res.status(400).json({ error }); });
          } if (sauce.usersDisliked.find((user) => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id,
            })
              .then(() => { res.status(201).json({ message: 'Your feedback has been added !' }); })
              .catch((error) => { res.status(400).json({ error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error }); });
      break;
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id,
      })
        .then(() => { res.status(201).json({ message: 'Your feedback has been added !' }); })
        .catch((error) => { res.status(400).json({ error }); });
      break;
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id,
      })
        .then(() => { res.status(201).json({ message: 'Your feedback has been added !' }); })
        .catch((error) => { res.status(400).json({ error }); });
      break;
    default:
      console.error('something went bad : wrong request !');
  }
};
/* eslint-enable no-console */
