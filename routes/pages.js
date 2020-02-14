const
    config = require('../config'),
    router = require('express').Router();

router.get('*', (req, res) => {
    res.render('index', {
        env: config.get('env'),
        config: {...config.get('client'), ...config.get('attachParams')},
        user: req.user ? req.user : {}
    });
});


module.exports = router;
