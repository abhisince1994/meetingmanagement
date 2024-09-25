const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.get('/', meetingController.getSlots);
router.post('/book-slot', meetingController.bookSlot);

module.exports = router;
