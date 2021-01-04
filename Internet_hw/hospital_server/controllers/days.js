const Day = require('../models/days');

module.exports.getDays = (req, res, next) => {
  const today = Date.now();

  const lastWeekDay = new Date(today + 86400 * 7 * 1000);

  Day.find({
    date: {
      $gte: new Date(new Date(today).setHours(00, 00, 00)),
      $lt: new Date(new Date(lastWeekDay).setHours(23, 59, 59)),
    },
  })
    .sort({ date: 'asc' })
    .then((days) => {
      if (!days) {
        throw new Error('Нет дней');
      }

      res.send(days);
    })
    .catch(next);
};

module.exports.createDay = (req, res, next) => {
  const { date } = req.body;

  Day.create({ date })
    .then((day) => {
      res.send(day);
    })
    .catch(next);
};

module.exports.deleteDay = (req, res, next) => {
  const { dayId } = req.params;

  Day.findById(dayId)
    .then((day) => {
      if (!day) {
        throw new NotFoundError('Такого дня не существует');
      }
      day
        .remove()
        .then(() => {
          res.send(day);
        })
        .catch(next);
    })
    .catch(next);
};
