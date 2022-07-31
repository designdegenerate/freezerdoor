"use strict";

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
    await queryInterface.bulkInsert(
      "walls",
      [
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
          width: 200,
          height: 100,
          x: 200,
          y: 400,
          rotation: -2.5,
          title: "Nextbt",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Febo_kalfsvleeskroket.jpg/800px-Febo_kalfsvleeskroket.jpg",
          width: 200,
          height: 100,
          x: 500,
          y: 400,
          rotation: 1,
          title: "Nextbit Robin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("walls", null, {});
  },
};
