const { Sequelize } = require('sequelize');
const UserModel = require('./user');

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/appdb';
const sequelize = new Sequelize(databaseUrl, { logging: false });

const User = UserModel(sequelize);

module.exports = { sequelize, User };
