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
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1663882745/Nickelback_-_How_You_Remind_Me_OFFICIAL_VIDEO_qj2hg6.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663882070/5c4ae7e66cf99614a868eb5f-large_ozqkpu.webp'
      },
      {
        albumId: 2,
        userId: 2,
        title: 'The Missle Knows Where it is',
        description: 'The missle knows where it is because the missle knows where it isnt',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1663883129/The_Missile_Knows_Where_It_Is..._eypsmb.mp4',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663883428/hypersonic_tjynyw.jpg'
      },
      {
        albumId: 3,
        userId: 3,
        title: 'Intl Brandons Anthem',
        description: 'Everyone is a Brandon',
        url: 'https://www.youtube.com/watch?v=Q1alKKG3BiI',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663898735/293123183_10223562231378110_1866346715737280205_n_bfovoe.jpg'
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
