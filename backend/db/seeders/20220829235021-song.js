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
      // user 1 (Nickelback) songs
      {
        albumId: 1,
        userId: 1,
        title: 'How You Remind Me',
        description: 'Nickelback is back with a brand new nickle',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1663951875/joannasFavoriteSong_e3vdyk.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663882070/5c4ae7e66cf99614a868eb5f-large_ozqkpu.webp'
      },
      {
        albumId: 1,
        userId: 1,
        title: 'Photograph',
        description: 'Yeeeeeeeah Nickleback.com',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676913551/Nickelback_-_Photograph_OFFICIAL_VIDEO_ox7q7y.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663882070/5c4ae7e66cf99614a868eb5f-large_ozqkpu.webp'
      },
      {
        albumId: 4,
        userId: 1,
        title: 'Rockstar',
        description: 'This guy really do be a rock star amirite',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676913931/Nickelback_-_Rockstar_OFFICIAL_VIDEO_tqqaql.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663882070/5c4ae7e66cf99614a868eb5f-large_ozqkpu.webp'
      },
      {
        albumId: 4,
        userId: 1,
        title: 'If Today Was Your Last Day',
        description: 'Yeeeeeeeah Nickleback.com',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676914165/Nickelback_-_If_Today_Was_Your_Last_Day_OFFICIAL_VIDEO_a5zprn.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663882070/5c4ae7e66cf99614a868eb5f-large_ozqkpu.webp'
      },
      // user 2 (Ziggy) songs
      {
        albumId: 2,
        userId: 2,
        title: 'The Missle Knows Where it is',
        description: 'The missle knows where it is because the missle knows where it isnt',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1663883129/The_Missile_Knows_Where_It_Is..._eypsmb.mp4',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663883428/hypersonic_tjynyw.jpg'
      },
      // Brandons songs
      {
        albumId: 3,
        userId: 3,
        title: 'Intl Brandons Anthem',
        description: 'Everyone is a Brandon',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1663952252/UGK_Ft_OutKast_International_Players_Anthem_Dirty_Version_ev1wx1.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663898735/293123183_10223562231378110_1866346715737280205_n_bfovoe.jpg'
      },
      {
        albumId: 3,
        userId: 3,
        title: 'Tasaki Time',
        description: 'This one goes out to all the Tasakis out there',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1666620849/Wii_Shop_Channel_Music_rejbaw.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663898735/293123183_10223562231378110_1866346715737280205_n_bfovoe.jpg'
      },
      {
        albumId: 3,
        userId: 3,
        title: `Nothin' but a "B" Thang`,
        description: 'This one comes from the heart',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676913667/Dr.Dre_-_Nuthin_but_a__G__Thang_p6eumv.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663898735/293123183_10223562231378110_1866346715737280205_n_bfovoe.jpg'
      },
      // Demo user songs
      {
        albumId: 5,
        userId: 4,
        title: "What You Won't do For Love",
        description: 'Bada buh buh baaaaaaaah',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676913658/What_You_Won_t_Do_for_Love_p9nkiz.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880404/cld-sample-5.jpg'
      },
      {
        albumId: 5,
        userId: 4,
        title: 'Flowers and Fire',
        description: 'Hey give it a listen 😎',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676920119/Blitz_-_Flowers_Fire_1_ygix2i.mp4',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880404/cld-sample-5.jpg'
      },
      {
        albumId: 5,
        userId: 4,
        title: 'Take the A-Train',
        description: "Your train is leaving in 15 minutes come on don't be late",
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676920344/Duke_Ellington__Take_the_A_Train__elspzs.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880404/cld-sample-5.jpg'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'One of These Nights',
        description: 'Tell the Eagles pls no sue me',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676920982/One_of_These_Nights_2013_Remaster_hzo3to.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880401/cld-sample-2.jpg'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Kiss Me More',
        description: 'Gotta sing this one every time it comes on',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676921168/Kiss_Me_More_ofiynj.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880401/cld-sample-2.jpg'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Dancing in the Dark',
        description: "He's really do be the boss",
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676921416/Bruce_Springsteen_-_Dancing_In_the_Dark_Official_Video_qruzqm.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880401/cld-sample-2.jpg'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'BlaBlaBla',
        description: 'Thump Thump Thump Thump Thump Thump Thump Thump Thump',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1676921562/Gigi_D_Agostino_Bla_Bla_Bla_wquazz.mp3',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1663880401/cld-sample-2.jpg'
      },
      // Papa Peden songs
      {
        albumId: 6,
        userId: 9,
        title: 'Abbey',
        description: 'King of the snails yo',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025320/Abbey_3.20.16_Final_y1sgvx.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'If Not Winter',
        description: 'If not winter why not now?',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025319/If_Not_Winter__Final_w6ccza.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Wreck Beach',
        description: 'Dang, there\'s a lot of naked folks here',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025317/Wreck_Beach_10.13.16_Final_c77ty0.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'A Foreign Winter',
        description: 'This one kinda sad tho',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025317/A_Foreign_Winter_s_Pink_12.18.16_Final_yahnzb.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'In 5 Years',
        description: 'I\'m this 🖐 many',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025315/In_5_Years_6.17.16_Final_ys1unp.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Wind Chimes',
        description: 'Big pie guy',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025314/Wind_Chimes_10.15.16_Final_c07reh.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Belleville',
        description: 'Shout out Belleville!',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025310/Belleville_8.19.16_Final_lgvlun.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Sea_Foam',
        description: 'How can I say goodbye',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025310/Sea_Foam_6.1.16_Final_rr16j9.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Sentimental Talks',
        description: 'Here comes the sun',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025308/Sentimental_Talks_7.22.16_Final_qugtmz.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'Your Middle Name',
        description: 'Mines David what about yours?',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025305/Your_Middle_Name_6.11.16_Final_shkcur.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
      },
      {
        albumId: 6,
        userId: 4,
        title: 'See You In Paris',
        description: 'Later Alligator!',
        url: 'https://res.cloudinary.com/dy199z8qt/video/upload/v1677025305/See_You_In_Paris_7.20.16_gp3vsc.m4a',
        imageUrl: 'https://res.cloudinary.com/dy199z8qt/image/upload/v1677028504/e2e8293b4da233f932b570fd42b64db3_vtzind.png'
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
    return queryInterface.bulkDelete('Songs');
  }
};
