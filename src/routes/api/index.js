const { Router }  = require('express');
const user        = require('./user');
const login       = require('./login');
const players      = require('./players');

const router      = new Router();

router.use('/user', user);
router.use('/login', login);
router.use('/players', players);

module.exports = router;
