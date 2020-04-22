const
    path = require('path'),
    moment = require('moment'),
    StackTracey = require('stacktracey'),
    {yellow, cyan, red, black, white} = require('chalk'),
    {createLogger, transports, format: {printf}} = require('winston');

const makeLevel = level => ({
    info: black.bgCyan.bold(` ${level} `),
    warn: black.bgYellow.bold(` ${level} `),
    error: black.bgRed.bold(` ${level} `),
    debug: black.bgGreen.bold(` ${level} `)
});

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const getStartEndRangeValues = (start, end, size) => ({
    start: start < 0 ? 0 : start,
    end: end > size ? size : end
});

const generateInfoLog = ({level, message}) => `
${makeLevel(level.toUpperCase())[level]} ${cyan(message)}
       in ${moment().format('YYYY-MM-DD | HH:mm:ss.sss')} 
`;

const generateWarnLog = ({level, message}) => `
${makeLevel(level.toUpperCase())[level]} ${yellow(message)}
       in ${moment().format('YYYY-MM-DD | HH:mm:ss.sss')} 
`;

const generateErrorLog = ({name, stack, label, level, message}) => {
    let
        lines = [],
        filePath,
        parsedPath,
        {
            line: lineWithError,
            column: columnWithError,
            sourceFile
        } = new StackTracey(stack).withSources[0],
        sourceLines = sourceFile.lines_;

    if (label) {
        parsedPath = path.parse(label);
        filePath = red.underline(parsedPath.base)
    }

    const {start, end} = getStartEndRangeValues(
        lineWithError - 2,
        lineWithError + 2,
        sourceLines.size
    );

    for (let line of range(start, end)) {
        const lineWithCode = line === lineWithError ?
            `${black.bgRed.bgWhite(line)} | ${black.bgRed.bgWhite(sourceLines[line])}` :
            `${white.underline(line)} | ${sourceLines[line]}`;

        lines.push(lineWithCode);
    }

    const stackTemplate = lines.length > 0 ? lines.join(('\n        ')) : '';

    return `
${makeLevel(level.toUpperCase())[level]} ${message}
        type: ${red.bold(name)}
        time: ${moment().format('YYYY-MM-DD | HH:mm:ss.sss')}
        ${label ? `in: ${parsedPath.dir}/${filePath}` : ''}
        at position [line: ${lineWithError}: column: ${columnWithError}]
           
        ${stackTemplate}`;
};

const loggers = {
    info: generateInfoLog,
    warn: generateWarnLog,
    // TODO: Доделать
    debug: generateInfoLog,
    error: generateErrorLog
};

const customFormat = printf(({label, stack, name, level, message}) =>
    loggers[level]({stack, name, label, level, message}));

module.exports = createLogger({
    format: customFormat,
    transports: [
        new transports.Http(),
        new transports.Console()
    ]
});
