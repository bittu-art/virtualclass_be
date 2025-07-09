const roomController = require('../controller/rooms_controller');
const express = require('express');
const router = express.Router();

router.get('/', roomController.getallRooms);

module.exports = router;