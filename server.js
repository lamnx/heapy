const
    fs = require('fs'),
    jsyaml = require('js-yaml'),
    oasTools = require('oas-tools'),
    path = require('path'),
    cors = require('cors'),
    Http = require('http'),
    logger = require('./utils/logger/pinoLoggerFactory')(),
    Express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./config');

const app = new Express();

const spec = fs.readFileSync(path.join(__dirname, 'config/openapi.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);
const serverPort = config.get('portWeb');

logger.info(serverPort);

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

const startServerAsync = async () => {

    // if (config.get('autoMigrateOnStart')) {
    //     await migrator.up();
    // }

    // Start the server
    Http.createServer(app).listen(serverPort, () => {
        logger.info(`Your server is listening on port ${serverPort} (http://localhost:${serverPort})`);
        logger.info(`Swagger-ui is available on http://localhost:${serverPort}/docs`);
    });
};

oasTools.configure({
    swaggerUi: path.join(__dirname, './config/openapi.yaml'),
    controllers: path.join(__dirname, './handlers'),
    // loglevel: 'warn',
    // logfile: './logs/app.log',
    customLogger: logger,
    docs: !!config.get('printDocsFlag') && {
        apiDocs: '/api-docs',
        apiDocsPrefix: '',
        swaggerUi: '/docs',
        swaggerUiPrefix: ''
    }
});

oasTools.initialize(swaggerDoc, app, () => {
    startServerAsync();
});

app.use('/', require('./routes').router);

module.exports = app;



