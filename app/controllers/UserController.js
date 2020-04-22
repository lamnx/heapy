const
    db = require('../database'),
    ControllerCommon = require('../utils/ControllerCommon');

class UserController {
    constructor() {
        this.common = new ControllerCommon();
    }

    async getUsers(user, query) {
        try {
            console.log(user);
            return await db.user.findAll();
        } catch (err) {
            throw new Error(err);
        }
   }
}

module.exports = UserController;
