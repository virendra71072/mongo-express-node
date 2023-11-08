var jwt                     = require('jsonwebtoken');
const constant              = require(__basePath + '/app/config/constant');
const config                = require(constant.path.app + 'core/configuration');
const User                  = require(constant.path.app + 'module/model/mongoDatabase/user.model');
const response              = require(constant.path.app + 'util/response');

exports.verify = async (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json(response.build('ERROR_AUTHENTICATION', { auth: false, message: 'No token provided.' }));

    jwt.verify(token, config.get('secrets').session, function(err, decoded) {
        if (err) return res.status(500).json(response.build('ERROR_AUTHENTICATION', { auth: false, message: 'Failed to authenticate token.' }));


        var user =  User.findById(decoded._id,{ password: 0 });

        user.then((result) => {
            if (result) {
                next();
            } else {
                return res.status(500).json(response.build('ERROR_SERVER_ERROR', "Invalid User"));
            }
        }).catch((error) => {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', "There was a problem finding the user."));
        });
    });
}
