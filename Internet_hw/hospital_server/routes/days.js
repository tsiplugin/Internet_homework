const router = require('express').Router();

const { getDays, createDay, deleteDay } = require('../controllers/days');

router.get('/', getDays);

router.post('/', createDay);

router.delete('/:dayId', deleteDay);

module.exports = router;
