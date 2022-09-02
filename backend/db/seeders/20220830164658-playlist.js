'use strict';

const { Playlist, sequelize } = require('../models');

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
   await Playlist.bulkCreate([
    {
      userId: 1,
      name: 'Favorite Nickelback Songs',
      imageUrl: 'go here to see nickelback pic'
    },
    {
      userId: 2,
      name: 'Satanic Ritual Music',
      imageUrl: 'add pic link here'
    },
    {
      userId: 3,
      name: 'Every song on the website',
      imageUrl: 'add pic link here'
    }
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
    return queryInterface.bulkDelete('Playlists', {
      title: { [Op.in]: ['Favorite Nickelback Songs', 'Satanic Ritual Music', 'Every song on the website']}
    });
  }
};
