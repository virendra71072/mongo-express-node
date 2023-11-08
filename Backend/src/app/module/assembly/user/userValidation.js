const constant         = require(__basePath + 'app/config/constant');
const validationHelper = require(constant.path.app + 'util/validation');
const responseHelper   = require(constant.path.app + 'util/response');

exports.get = function (req, res, next) {
    let headerSchema = {
        "x-access-token" : {
            notEmpty: true
        },
    };

    let schema = {};

    let querySchema = {};

    let bodySchema = {}

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkQuery(querySchema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};

exports.create = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let querySchema = {};

    let bodySchema = {
        name : {
            notEmpty: true
        },
        username : {
            notEmpty: true
        },
        email : {
            notEmpty: true
        },
        accountType : {
            notEmpty: true
        },
        hashedPassword : {
            notEmpty: true
        }
    }

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkQuery(querySchema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};

exports.update = function (req, res, next) {
    let headerSchema = {
        "x-access-token" : {
            notEmpty: true
        },
    };

    let schema = {
        userId : {
            notEmpty: true
        }
    };

    let querySchema = {};

    let bodySchema = {}

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkQuery(querySchema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};
exports.login = function (req, res, next) {
    let headerSchema = {};

    let schema = {
    };

    let querySchema = {};

    let bodySchema = {
        email : {
            notEmpty: true
        },
        password : {
            notEmpty: true
        },
    }

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkQuery(querySchema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};
