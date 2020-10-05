const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
// eslint-disable-next-line no-unused-vars
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces-ctrl');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.updateSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.sauceNotation);
module.exports = router;
