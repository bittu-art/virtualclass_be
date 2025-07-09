const roomController = require('../controller/rooms_controller');
const express = require('express');
const router = express.Router();

router.get('/', roomController.getallRooms);
router.get('/allhistory', roomController.getallHistroy);

module.exports = router;