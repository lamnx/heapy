const
    express = require('express'),
    router = express.Router({ mergeParams: true });

router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method === 'OPTIONS') res.status(200);
    else next();
});

const routes = ['pages'];

routes.forEach(name => {
    (router).use(require(`./${name}`));
});

exports.router = router;
