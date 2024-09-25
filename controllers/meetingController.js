const Booking = require('../models/booking');
const { Op } = require('sequelize');

exports.getSlots = async (req, res) => {
    // Fetch available slots and bookings from the database
    const timeSlots = await Booking.findAll({
        where: {
            // Logic to determine available slots can go here
        },
    });
    res.render('index', { timeSlots });
};

exports.bookSlot = async (req, res) => {
    const { slotId, name, email } = req.body;
    await Booking.create({ slotId, name, email });
    res.redirect('/');
};
