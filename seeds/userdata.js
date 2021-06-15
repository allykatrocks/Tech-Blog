const {User} = require('../models/index');

const users = [{'username': 'allykatrocks', 'password': 'Starboy1!'}]

function seedUsers() {
    User.bulkCreate(users, {individualHooks: true, returning: true})
}

module.exports = seedUsers;