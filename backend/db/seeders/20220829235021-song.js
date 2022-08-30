'use strict';

const { Song } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Song.bulkCreate([
      {
        albumId: 1,
        userId: 1,
        title: 'Brand New Shiny Nickle',
        description: 'Nickelback is back with a brand new nickle',
        url: 'https://www.youtube.com/watch?v=CD8nrL8ttNI',
        imageUrl: 'funnpic.xD'
      },
      {
        albumId: 2,
        userId: 2,
        title: 'The Missle Knows Where it is',
        description: 'The missle knows where it is because the missle knows where it isnt',
        url: 'https://www.youtube.com/watch?v=bZe5J8SVCYQ',
        imageUrl: 'missle.jpg'
      },
      {
        albumId: 3,
        userId: 3,
        title: 'Intl Brandons Anthem',
        description: 'Everyone is a Brandon',
        url: 'https://www.youtube.com/watch?v=Q1alKKG3BiI',
        imageUrl: 'brandon.png'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Brand New Shiny Nickle', 'The Missle Knows Where it is', 'Intl Brandons Anthem'] }
    });
  }
};
