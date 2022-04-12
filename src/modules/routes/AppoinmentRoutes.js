const express = require('express');
const router = express.Router();

const {
  getAllList,
 
} = require('../controllers/appointment.controller');

router.get('/allList', getAllList);

module.exports = router;