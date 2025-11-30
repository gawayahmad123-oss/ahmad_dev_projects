require('dotenv').config();
const { sequelize } = require('./models');

async function migrate() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Migrated ✅');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

if (require.main === module) migrate();
