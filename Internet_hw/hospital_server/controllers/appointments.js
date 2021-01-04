const Appointment = require('../models/appointments');

module.exports.getDayAppointments = (req, res, next) => {
  const { dayId } = req.params;

  Appointment.find({ day: { _id: dayId } })
    .sort({ time: 'asc' })
    .populate('day')
    .then((appointment) => {
      if (!appointment) {
        throw new Error('Нет пользователей');
      }

      res.send(appointment);
    })
    .catch(next);
};

module.exports.addAppointmentToDay = (req, res, next) => {
  const { dayId, time, half } = req.body;

  Appointment.create({ time, half, day: dayId })
    .then((appointment) => {
      res.send(appointment);
    })
    .catch(next);
};

module.exports.deleteAppointment = (req, res, next) => {
  const { _id } = req.body;

  Appointment.findById(_id)
    .then((appointment) => {
      if (!appointment) {
        throw new NotFoundError('Такого дня не существует');
      }
      appointment
        .remove()
        .then(() => {
          res.send(appointment);
        })
        .catch(next);
    })
    .catch(next);
};
