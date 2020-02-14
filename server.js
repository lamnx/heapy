const
    path = require('path'),
    cors = require('cors'),
    Express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./config');

const app = new Express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


if (config.get('env') === 'development') {
    (() => {
        // Step 1: Create & configure a webpack compiler
        const
            webpack = require('webpack'),
            webpackConfig = require('./webpack.dev.js'),
            compiler = webpack(webpackConfig);

        // Step 2: Attach the dev middleware to the compiler & the server
        app.use(require('webpack-dev-middleware')(compiler, {
            logLevel: 'warn', publicPath: webpackConfig.output.publicPath
        }));

        // Step 3: Attach the hot middleware to the compiler & the server
        app.use(require('webpack-hot-middleware')(compiler));
    })();
}

app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: false }));
app.use(cookieParser());
app.use(Express.static(path.join(__dirname, 'public')));





