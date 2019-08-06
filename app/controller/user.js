const Mock = require('mockjs');

class User {
    constructor() {

    }

    getUsers() {
        const users = Mock.mock({
            'list|1-10': [{
                'id|+1': 1
            }]
        })
        return users;
    }
}

module.exports = new User();