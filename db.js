const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:Rylen2019!@localhost:5432/animal-server");

module.exports = db;