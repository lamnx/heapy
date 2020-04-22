const
    _ = require('lodash-core'),
    CustomError = require('./CustomError');

/**
 * Для того чтобы подключить справочник ошибок использовать
 * при старте сервера статическое свойство setDictionary
 */

class ExtendedError extends CustomError {

    /**
     * @param message - системное сообщение. Если не указано userMessage (см. ниже),
     * то по умолчанию отобразится это системное сообщение
     * @param status - HTTP статус с которым надо вернуть ошибку.
     * Может быть перекрыт при перехвате ошибок.
     * @param code - уникальный текстовый код ошибки.
     * Все коды стараемся описывать в справочнике ошибок (extendedErrorCodes.js)
     * Справочник ошибок иерархический. Коды тоже могут передаваться строкой с учетом иерархии,
     * например 'STATUS.ROADLIST_REQUIRED'
     * @param info - объект с произвольными данными. Есть соглашения по ключам:
     * userMessage - если передано не пустое, то это станет сообщением для пользователя на клиенте.
     * Если переданный code был найден в справочнике ошибок,
     * и значение в справочнике строковое, то это значение
     * автоматически заполнит это поле userMessage
     * @param previousError
     */
    constructor(message, status, code, info = undefined, previousError = undefined) {
        super(message, status, previousError);
        delete this.name;
        this.code = code;
        this.info = Object.assign(this.constructor.getDescriptionFromDictionary(code), info || {});
    }

    static setDictionary(dictionary) {
        this.dictionary = dictionary;
    }

    static getDictionary() {
        return this.dictionary || {};
    }

    static getDescriptionFromDictionary(code) {
        const desc = _.get(this.getDictionary(), code);
        let result = {};

        if (desc) {
            if (typeof desc === 'string') {
                result = {
                    userMessage: desc
                };
            } else if (typeof desc === 'object') {
                result = desc;
            }
        }

        return result;
    }

    static fromError(e, defaultStatus, defaultCode = 'COMMON.SERVER_ERROR') {
        let err;

        if (e instanceof this) {
            err = e;
        } else if (e instanceof Error) {
            err = new this(
                e.message,
                e.statu
                    ? e.status
                    : defaultStatus,
                defaultCode,
                undefined,
                e
            );
        }

        err = new this(e, defaultStatus);

        return err;
    }

    getUserMessage(getSystemIfEmpty = true) {
        let userMessage = this.info && this.info.userMessage ? this.info.userMessage : undefined;

        if (userMessage === undefined && getSystemIfEmpty) {
            userMessage = this.message;
        }

        return userMessage;
    }

    getCode() {
        return this.code;
    }

    getInfo() {
        return this.info;
    }
}

module.exports = ExtendedError;
