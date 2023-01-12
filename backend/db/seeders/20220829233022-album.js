'use strict';

const { Album } = require('../models');

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
    await Album.bulkCreate([
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
      },
      {
        userId: 1,
        title: 'Nickelback is The Best',
        description: 'Needs no further description 😎',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 4,
        title: 'Demo Tape',
        description: 'Songs from around the world',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 4,
        title: 'My Greatest Hits',
        description: 'The best of the best',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 6,
        title: "Zigan's Room",
        description: 'In my Feelings',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 6,
        title: "2 Zigan 2 Zerious",
        description: "He's back and Ziganer than ever",
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 6,
        title: 'Zigan in da House',
        description: 'Zigan out here frfr',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 7,
        title: 'Gaming is for the People',
        description: 'You ever gamed before?',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 7,
        title: 'Gamers Unite',
        description: 'Unite Gamers, it is time.',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 8,
        title: 'Daddy Phat $tax',
        description: 'Daaaaaaaaaaaaaang, look at all this money.',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
      {
        userId: 8,
        title: 'Money 2 da Ceilin',
        description: 'These ceilings vaulted too!',
        imageUrl: 'https://www.cheryls.com/blog/wp-content/uploads/2022/07/Unicorn-feature-hero-1.jpg'
      },
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
    return queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['Finally Got My Nickel Back!', 'Ziggy Stardust', 'Brandons Mix']}
    });
  }
};
