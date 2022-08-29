'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Joanna',
        lastName: 'Gilbert',
        email: 'joanna@gilbert.com',
        username: 'NickelbackFan1000',
        imageUrl: 'https://www.digitalmusicnews.com/wp-content/uploads/2016/12/nickelbackmeme7-1.jpg',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'David',
        lastName: 'Rogers',
        email: 'mrrogers@appacademy.io',
        username: '9ziggy9',
        imageUrl: 'https://media.discordapp.net/attachments/996595927831810129/1013949711088107530/unknown.png',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Brandon',
        lastName: 'Tasaki',
        email: 'haichiroku@gmail.com',
        username: 'NOT_BRANDON',
        imageUrl:'https://www.sportspar.de/media/image/90/2a/25/770506-1tcB3OKBmikA45.jpg',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
