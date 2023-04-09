const { createUser, signin } = require('../controllers/user');
const { validateUser, validate } = require('../middlewares/validator');

const router = require('express').Router()


router.post('/create',validateUser,validate, createUser );
router.post('/signIn', signin);

module.exports = router;