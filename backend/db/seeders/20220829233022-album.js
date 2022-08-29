'use strict';

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
    return await queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: 'Finally Got My Nickel Back!',
        description: 'The best of the best from Nicholas Nickelback and the gang',
        imageUrl: 'https://images6.fanpop.com/image/photos/33800000/nickleback-nickelback-33858308-1024-768.jpg'
      },
      {
        userId: 2,
        title: 'Ziggy Stardust',
        description: 'This is the David Bowie album and totally not JavaScipt tutorials',
        imageUrl: 'https://cdn.shopify.com/s/files/1/0352/6174/3148/products/david-bowie-ziggy-stardust-t-shirt-good-records-to-go_grande.jpg'
      },
      {
        userId: 3,
        title: 'Brandons Mix',
        description: 'Songs by Brandons for Brandons',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
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
  }
};
