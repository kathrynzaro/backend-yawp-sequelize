'use strict';

// const db = require('../models');
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
    await queryInterface.bulkInsert('Movies', [
      {
        title: 'Fresh',
        description: 'Bad movie, do not watch',
        image: 'www.FreshFilm.com',
        releaseYear: '2022',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Beerfest',
        description: 'Great movie, do watch',
        image: 'www.BeerfestFilm.com',
        releaseYear: '2006',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'The Corpse Bride',
        description: 'Fantastic movie, definitely watch',
        image: 'www.TheCorpseBrideFilm.com',
        releaseYear: '2005',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pans Labyrinth',
        description: 'Very trippy yet excellent movie',
        image: 'www.PansLabyrinthFilm.com',
        releaseYear: '2006',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
