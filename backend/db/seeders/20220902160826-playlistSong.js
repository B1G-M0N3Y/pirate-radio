'use strict';

const { PlaylistSong } = require('../models');

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
    await PlaylistSong.bulkCreate([
      {
        songId: 1,
        playlistId: 1,
        order: 1
      },
      {
        songId: 1,
        playlistId: 2,
        order: 1
      },
      {
        songId: 2,
        playlistId: 2,
        order: 2
      },
      {
        songId: 1,
        playlistId: 3,
        order: 2
      },
      {
        songId: 2,
        playlistId: 3,
        order: 3
      },
      {
        songId: 3,
        playlistId: 3,
        order: 1
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
    return queryInterface.bulkDelete('PlaylistSongs');
  }
};
