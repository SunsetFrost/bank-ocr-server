const Mock = require('mockjs');

class User {
    constructor() {

    }

    getUsers() {
        const users = Mock.mock({
            'users|100': [
                {
                'id|+1': 1,
                'username': '@CNAME',
                'password|6-15': '@character()',
                'address': '@city(true)',
                'desc': '@paragraph(1)',
                'register-date': '@datetime("yyyy-MM-dd A HH:mm")'
                }
            ]
        })
        return users.users;
    }
}

module.exports = new User();