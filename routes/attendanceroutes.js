const attendance_controller = require('../controller/attendance_controller');
const express = require('express');
const router = express.Router();

router.get('/:classId', attendance_controller.getallattendace);

module.exports = router;