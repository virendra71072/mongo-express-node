const constant = require(__basePath + '/app/config/constant');
const mongoose = require("mongoose");
const config   = require(constant.path.app + 'core/configuration');

/** Class representing a database object */
class MongooseDB {

    constructor() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.get('mongoDatabase:url'), config.get('mongoDatabase:options'));
    }

}

module.exports = MongooseDB;
