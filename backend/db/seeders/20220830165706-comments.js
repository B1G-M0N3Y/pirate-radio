'use strict';

const { Comment } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Comment.bulkCreate([
      {
        songId: 2,
        userId: 1,
        body: 'Golly gee wilikers! I sure do love this song that is not a JavaScript tutorial'
      },
      {
        songId: 1,
        userId: 3,
        body: 'Joanna please, get some help'
      },
      {
        songId: 1,
        userId: 2,
        body: 'This song is awful'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Comments')
  }
};
