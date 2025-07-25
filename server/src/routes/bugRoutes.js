const express = require('express');
const router = express.Router();
const {
  createBug,
  getBugs,
  updateBug,
  deleteBug,
} = require('../controllers/bugController');

router.route('/')
  .get(getBugs)
  .post(createBug);

router.route('/:id')
  .put(updateBug)
  .delete(deleteBug);

module.exports = router;
