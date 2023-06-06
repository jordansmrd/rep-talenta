const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers').attendanceController;
//get
router.post('/', attendanceController.getByMonthAndUser);

router.post('/v1', attendanceController.createAttendance);
router.get('/', attendanceController.getToday);

module.exports = router;
