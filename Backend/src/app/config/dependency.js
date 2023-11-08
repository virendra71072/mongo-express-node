const constant      = require(__basePath + '/app/config/constant');
const logger        = require(constant.path.app + 'core/logger');
const config        = require(constant.path.app + 'core/configuration');


module.exports = function (app) {
    //Setting dependencies
    app.set('di', {
        constant: constant,
        log     : logger,
        config  : config
    });

    //Applying Security Module
    //app.use(security.check);

    //Application Modules to load
    app.group("/api/v1", (router) => {
        // router.get("/login", loginController.store); // /api/v1/login
        router.use('/monitor', require(constant.path.module + 'assembly/monitor').router);
        router.use('/user', require(constant.path.module + 'assembly/user').router);
    });

    // app.use('/api/v1/monitor', require(constant.path.module + 'assembly/monitor').router);
    // app.use('/api/v1/user', require(constant.path.module + 'assembly/user').router);

};
