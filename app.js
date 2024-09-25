const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Your Sequelize instance

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Server-side code
let slots = [
    { time: "2:00 PM", availableSeats: 4 },
    { time: "2:30 PM", availableSeats: 4 },
    { time: "3:00 PM", availableSeats: 4 },
    { time: "3:30 PM", availableSeats: 4 }
];

let bookedMeetings = [];

// Route to render the main page
app.get('/', (req, res) => {
    res.render('index', { slots: slots, bookedMeetings: bookedMeetings });
});

// POST route to handle booking a slot
app.post('/book-slot', (req, res) => {
    const { name, email, slot } = req.body;

    // Find the slot and reduce the available seats
    const bookedSlot = slots.find(s => s.time === slot);
    if (bookedSlot && bookedSlot.availableSeats > 0) {
        bookedSlot.availableSeats -= 1;

        // Generate a Google Meet link (placeholder for this example)
        const googleMeetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`;

        // Add the booking to bookedMeetings
        bookedMeetings.push({ name, email, time: slot, link: googleMeetLink });
    }

    res.redirect('/');
});

// Route to handle canceling a meeting
app.post('/cancel-meeting/:id', (req, res) => {
    const meetingId = req.params.id;
    const canceledMeeting = bookedMeetings[meetingId];

    if (canceledMeeting) {
        // Find the slot and increase the available seats
        const slot = slots.find(s => s.time === canceledMeeting.time);
        if (slot) {
            slot.availableSeats += 1; // Increase available seats
        }
        // Remove the canceled meeting from bookedMeetings
        bookedMeetings.splice(meetingId, 1);
    }

    res.redirect('/');
});

// Sync the Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
        // Start the server after the database has synced
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error syncing the database:', err);
    });




































// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const sequelize = require('./config/database');
// const meetingRoutes = require('./routes/meetingRoutes');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// // Routes
// app.use('/', meetingRoutes);

// // Sync the database and start the server
// sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// }).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });
