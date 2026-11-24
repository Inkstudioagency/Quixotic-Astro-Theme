'use strict';

const seed = require('./seed');

module.exports = {
  register(/* { strapi } */) {},

  /**
   * Imports the theme's demo content on first boot (see src/seed.js).
   */
  async bootstrap({ strapi }) {
    try {
      await seed(strapi);
    } catch (error) {
      strapi.log.error(`[seed] ${error.message}`);
    }
  },
};
