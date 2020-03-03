const httpCode = require('http-status-codes-js'),
    ExtendedError = require('../utils/error/ExtendedError');


class ControllerCommon {

    static makeSendableError(error, defaultStatus = httpCode.SERVER_ERRORS.INTERNAL_SERVER_ERROR) {
        const result = ExtendedError.fromError(error, defaultStatus);

        if (error instanceof ExtendedError) result.error = true;
        return result;
    }

    static sendError(res, error, defaultStatus = httpCode.SERVER_ERRORS.INTERNAL_SERVER_ERROR) {
        const err = this.makeSendableError(error, defaultStatus);

        console.error({err});
        res.status(err.status);
        res.send(err);
    }

    static sendJsonOk(res, result) {
        res.status(httpCode.SUCCESS.OK);
        res.send(result);
    }

    static sendOk(res, result) {
        res.status(httpCode.SUCCESS.OK);
        res.send(result);
    }

    sendJsonOk(res, result) {
        res.status(httpCode.SUCCESS.OK);
        res.json(result);
    }

    serverError(res) {
        return error => {
            res.status(httpCode.SERVER_ERRORS.INTERNAL_SERVER_ERROR);
            res.json(error);
        };
    }

    static sendDocFile(res, data, filename) {
        res.status(httpCode.SUCCESS.OK);
        res.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('content-disposition', `inline; filename="${encodeURIComponent(filename)}"`);
        res.send(data);
    }

    static __sendFile(res, data, filename, contentType) {
        res.status(httpCode.SUCCESS.OK);
        res.setHeader('content-type', `${contentType}`);
        res.setHeader('content-disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
        res.setHeader('content-length', `${data.length}`);
        res.send(data);
    }

    static sendHtml(res, data) {
        res.status(httpCode.SUCCESS.OK);
        res.setHeader('content-type', 'text/html');
        res.setHeader('content-disposition', 'inline');
        res.send(data);
    }

    static sendDownloadedFile(res, response) {
        res.status(response.statusCode);
        res.set(response.headers);
        res.send(response.body);
    }

    static sendPdfFile(res, data, filename) {
        this.__sendFile(res, data, filename, 'application/pdf');
    }

    static sendZipFile(res, data, filename) {
        this.__sendFile(res, data, filename, 'application/zip');
    }

    //TODO: выделить в класс BadParams(extends ExtendedError)
    static throwBadParamsError(message = 'Invalid params', info = undefined, code = 'COMMON.BAD_PARAMS') {
        throw new ExtendedError(message, 400, code, info);
    }

    static async jsonResponse(req, res, func) {
        try {
            this.sendJsonOk(res, await func(req, res));
        } catch (err) {
            this.sendError(res, err);
        }
    }

    static makeJsonResponse(func) {
        return async (req, res) => this.jsonResponse(req, res, func);
    }
}

module.exports = ControllerCommon;
