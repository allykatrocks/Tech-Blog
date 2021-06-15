const sequelize = require('../config/config');
const seedUsers = require('./userdata');

async function seedAll() {
    await sequelize.sync({force: true})
    await seedUsers();
    process.exit(0);
}

seedAll();