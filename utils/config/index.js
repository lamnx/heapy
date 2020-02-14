const
    path = require('path'),
    nconf = require('nconf');

class Config {

    constructor(configFile) {
        /**
         * Переменные окружения, которые перекрывают конфиг по умолчанию:
         */
        nconf.env();

        /**
         *  Json конфиг целиком в переменной окружения.
         *  Если есть проблемы с экранированием то стоит использовать OVERRIDES_CONFIG_BASE64
         */
        if (nconf.get('OVERRIDES_CONFIG')) {
            let conf = nconf.get('OVERRIDES_CONFIG');

            conf = typeof conf === 'string' ? JSON.parse(conf) : conf;

            if (conf) {
                nconf.overrides(conf);
            }
        }

        /**
         * Json конфиг предварительно закодированный в base64.
         * Удобно если есть проблемы с экранированием кавычек при использовании OVERRIDES_CONFIG
         */
        if (nconf.get('OVERRIDES_CONFIG_BASE64')) {
            let conf = nconf.get('OVERRIDES_CONFIG_BASE64');

            conf = typeof conf === 'string' ? JSON.parse(new Buffer(conf, 'base64').toString()) : '';

            if (conf) {
                nconf.overrides(conf);
            }
        }

        /**
         * Путь к файлу конфига с json внутри. Мержится с основным файлов конфига.
         * Можно передавать как путь относительно текущей директории, так и абсолютный путь к файлу
         */
        let confFileName = nconf.get('OVERRIDES_CONFIG_FILE');

        if (confFileName) {
            nconf.file('overrides', path.join(path.isAbsolute(confFileName) ? '' : process.cwd(), confFileName));
        }

        /**
         * Конфиг по умолчанию
         */
        nconf.file('defaults', path.join(process.cwd(), configFile));

    }

    get(key) {
        return nconf.get(key);
    }
}

module.exports = Config;
