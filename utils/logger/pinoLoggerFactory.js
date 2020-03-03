const pino = require('pino');
const childProcess = require('child_process');
const stream = require('stream');

module.exports = () => pino({
    level: 'info',
    prettyPrint: {
        colorize: true
    }
});

module.exports.createWithFileTransport = function () {
    // Environment variables
    const cwd = process.cwd();
    const {env} = process;
    const logPath = './logs';

    // Create a stream where the logs will be written
    const logThrough = new stream.PassThrough();
    const log = pino({name: 'project'}, logThrough, streamToElastic);

    // Log to multiple files using a separate process
    const child = childProcess.spawn(process.execPath, [
        require.resolve('pino-tee'),
        'info', `${logPath}/pino.log`,
        'warn', `${logPath}/warn.log`,
        'error', `${logPath}/error.log`,
        'fatal', `${logPath}/fatal.log`
    ], {cwd, env});

    logThrough.pipe(child.stdin);

    return log;
};
