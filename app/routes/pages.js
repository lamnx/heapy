const
    config = require('../config'),
    router = require('express').Router();

router.get('*', (req, res) => {
    res.render('index', {
        env: config.get('env'),
        user: req.user ? req.user : {}
    });
});


module.exports = router;
