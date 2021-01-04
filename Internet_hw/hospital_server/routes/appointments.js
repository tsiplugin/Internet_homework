const router = require('express').Router();

const {
  getDayAppointments,
  addAppointmentToDay,
  deleteAppointment,
} = require('../controllers/appointments');

router.get('/:dayId', getDayAppointments);

router.post('/', addAppointmentToDay);

router.delete('/', deleteAppointment);

module.exports = router;
