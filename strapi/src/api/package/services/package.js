'use strict';

/**
 * package service
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreService('api::package.package');
