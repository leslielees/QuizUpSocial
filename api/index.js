const router = require('express').Router();
router.use('/players', require('./players'));
//router.use('/topics', require('./topics'));
//router.use('/posts', require('./posts'));

module.exports = router;