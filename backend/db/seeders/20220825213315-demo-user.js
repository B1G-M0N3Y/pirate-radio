'use strict';
const bcrypt = require("bcryptjs");

const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate([
      {
        username: 'NickelbackFan1000',
        firstName: 'Joanna',
        lastName: 'Gilbert',
        email: 'joanna@gilbert.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: '9ziggy9',
        firstName: 'David',
        lastName: 'Rogers',
        email: 'mrrogers@appacademy.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'NOT_BRANDON',
        firstName: 'Brandon',
        lastName: 'Tasaki',
        email: 'haichiroku@gmail.com',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['NickelbackFan1000', '9ziggy9', 'NOT_BRANDON'] }
    }, {});
  }
};
