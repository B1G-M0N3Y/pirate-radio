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
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663956835/nickleback-nickelback-33858308-1024-768_kybkiz.jpg'
      },
      {
        username: '9ziggy9',
        firstName: 'David',
        lastName: 'Rogers',
        email: 'mrrogers@appacademy.io',
        hashedPassword: bcrypt.hashSync('password2'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663964417/DavidZoomCrash_od9ky2.png'
      },
      {
        username: 'NOT_BRANDON',
        firstName: 'Brandon',
        lastName: 'Tasaki',
        email: 'haichiroku@gmail.com',
        hashedPassword: bcrypt.hashSync('password3'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663965240/143_riq6yi.png'
      },
      {
        username: 'demo-user',
        firstName: 'demo',
        lastName: 'user',
        email: 'demo@user.com',
        hashedPassword: bcrypt.hashSync('demouser'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663956835/nickleback-nickelback-33858308-1024-768_kybkiz.jpg'
      },
      {
        username: 'gamer-gus',
        firstName: 'gamer',
        lastName: 'gus',
        email: 'gamer@gus.com',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663956835/nickleback-nickelback-33858308-1024-768_kybkiz.jpg'
      },
      {
        username: 'Zigan',
        firstName: 'Epic',
        lastName: 'Gamer',
        email: 'zigan@user.com',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663956835/nickleback-nickelback-33858308-1024-768_kybkiz.jpg'
      },
      {
        username: 'papalopaz',
        firstName: 'Dmitri',
        lastName: 'Hodnett',
        email: 'dmitri@hodnett.com',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663956835/nickleback-nickelback-33858308-1024-768_kybkiz.jpg'
      },
      {
        username: 'B1G-M0N3Y',
        firstName: 'Noah',
        lastName: 'Kerner',
        email: 'noah@kerner.com',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663956835/nickleback-nickelback-33858308-1024-768_kybkiz.jpg'
      },
      {
        username: 'Papa Peden',
        firstName: 'Nate',
        lastName: 'Peden',
        email: 'nate@peden.com',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677027399/15421012_1403615059671446_2160225034962768983_n_o2jxfu.jpg'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users');
  }
};
