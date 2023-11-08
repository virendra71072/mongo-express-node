const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const utility               = require(constant.path.app + 'util/utility');
const config                = require(constant.path.app + 'core/configuration');
const baseModel             = require(constant.path.app + 'module/model/system/baseModel');
const User                  = require(constant.path.app + 'module/model/mongoDatabase/user.model');
const {logger}              = require(constant.path.app + 'core/logger');
const underscore            = require('underscore');
var jwt                     = require('jsonwebtoken');
const to                    = require('await-to-js').default;
const moment                = require('moment');

const baseModelObj         = new baseModel();

/*
 * Check & Create User
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.create = async (req, res, next) => {
    var email = req.body.email;

    // logger.info('[user-> create] params %s', JSON.stringify(req.body));


    var user = await User.findOne({email: email}).catch((error) => {
        // logger.info('[user-> create] Error %s', JSON.stringify(error));
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    });
    if (user) {
        // logger.info('[user-> create] Error %s', "The specified email address is already in use.");
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', "The specified email address is already in use."));
    }

    var newUser = new User(req.body);
    newUser.password = req.body.hashedPassword;
    newUser.provider = 'local';
    newUser.role = 'user';
    var rs = newUser.save();

    rs.then((result) => {
        return res.status(200).json(response.build('SUCCESS', {
            id: result._id,
            name: result.name,
            username: result.username,
            email: result.email,
            role: result.role
        }));
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    });
};

exports.update = (req, res, next) => {
    var userId = req.params.userId;
    var data = {};
    if (req.body.name) {
        data.name = req.body.name;
    }

    if (req.body.username) {
        data.username = req.body.username;
    }

    const rs = User.findByIdAndUpdate(userId, data);

    rs.then((result) => {
        if (result) {
            return res.status(200).json(response.build('SUCCESS', {
                id: result._id,
                name: result.name,
                username: result.username,
                email: result.email,
                role: result.role
            }));
        } else {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', "Invalid User"));
        }
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    });
};

exports.fetchUser = (req, res, next) => {
    var userId = req.params.userId;
    const rs = User.findById(userId);

    rs.then((result) => {
        if (result) {
            return res.status(200).json(response.build('SUCCESS', result));
        } else {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', "Invalid User"));
        }
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    });
};

exports.fetchAllUser = async (req, res, next) => {

    // console.log("====== data before", err, changesData);
    let fetchData = new Promise((resolve, reject) => {
        baseModelObj.sendRequest('GET','https://jsonplaceholder.typicode.com/todos/1',{},{},{}, (error, result, body) => {
            if (error) {
                reject(error);
            }
            resolve(body);
        })
    })
    let [err, changesData] = await to(fetchData);
    console.log("====== data before", err, changesData);
    // fetchData.then((data) => {
    //     console.log("=== data", data);
    // }).catch((error) => {
    //     console.log("====  error", error);
    // })
    console.log("====== data after");


    const rs = User.find();

    rs.then((result) => {
        if (result) {
            return res.status(200).json(response.build('SUCCESS', result));
        } else {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', "Invalid User"));
        }
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    });
};

exports.login = (req, res, next) => {
    console.log("==== login start", req.body);
    const data = {
        email: req.body.email,
    };

    const rs = User.findOne(data);

    rs.then((result) => {
        if (result && result.authenticate(req.body.password)) {
            var token = jwt.sign({
                _id: result._id,
                role: result.role
            },
            config.get('secrets').session,
            {
                expiresIn:  config.get('auth').expiration || '7d'

            });

            return res.status(201).json(response.build('SUCCESS', {token: token}));
        } else {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', "Invalid User"));
        }
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    });
};

