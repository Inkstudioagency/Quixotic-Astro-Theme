'use strict';

/**
 * blog route
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::blog.blog');
