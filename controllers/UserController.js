const ControllerCommon = require('../utils/ControllerCommon');

class UserController {

    constructor() {
        this.common = new ControllerCommon();
    }

   async getHello() {
        return {test: 'Hello World!'};
   }
}

module.exports = UserController;
