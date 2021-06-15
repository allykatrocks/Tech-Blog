const sequelize = require('../config/config');
const seedUsers = require('./userdata');
const seedPosts = require('./postdata');
const seedComments = require('./commentdata');

async function seedAll() {
    await sequelize.sync({force: true})
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
}

seedAll();