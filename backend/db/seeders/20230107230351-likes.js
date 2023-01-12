'use strict';

const {Like} = require("../models");

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
   await Like.bulkCreate([
    {
      userId:1,
      songId:1
    },
    {
      userId:1,
      songId: 2
    },
    {
      userId:1,
      songId:3
    },
    {
      userId:2,
      songId:1
    },
    {
      userId:2,
      songId:3
    },
    {
      userId:3,
      songId:1
    },
    {
      userId:3,
      songId:1
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
    return queryInterface.bulkDelete('Likes')
  }
};
