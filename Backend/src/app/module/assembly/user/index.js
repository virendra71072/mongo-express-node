const constant  = require(__basePath + 'app/config/constant');
const router    = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const user       = require(constant.path.module + 'assembly/user/userAssembly');
const validation    = require(constant.path.module + 'assembly/user/userValidation');
const auth    = require(constant.path.app + 'core/auth');

/*
 * Router list
 */
router.get(
    '/',
    validation.get,
    auth.verify,
    user.fetchAllUser
);
router.post(
    '/login',
    validation.login,
    user.login
);
router.post(
    '/',
    validation.create,
    user.create
);

router.put(
    '/:userId',
    validation.update,
    auth.verify,
    user.update
);
router.get(
    '/:userId',
    validation.update,
    auth.verify,
    user.fetchUser
);



module.exports = {
    router: router
};
