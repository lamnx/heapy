const
    UserController = require('../controllers/UserController'),
    ControllerCommon = require('../utils/ControllerCommon'),
    userController = new UserController();

module.exports = {
    usersGET: ControllerCommon.makeJsonResponse(req => userController.getHello(req.user, req.query))
    // usercurrentGET: makeJsonResponse(req => req.user)
};
