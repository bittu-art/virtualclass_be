const classController = require('../controller/classes_controller');
const express = require('express');
const router = express.Router();

router.get('/:room_id', classController.getallclasses);
router.get('/class-attendance/:classId', classController.getClassandAttendance);

module.exports = router;