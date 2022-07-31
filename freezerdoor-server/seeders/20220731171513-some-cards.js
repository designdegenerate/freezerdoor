"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cards",
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
    await queryInterface.bulkDelete("cards", null, {});
  },
};
