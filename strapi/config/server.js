module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Strapi MCP server (https://docs.strapi.io/cms/features/strapi-mcp-server).
  // Endpoint: POST <server>/mcp, authenticated with an Admin token. Disable with MCP_ENABLED=false.
  mcp: {
    enabled: env.bool('MCP_ENABLED', true),
  },
});
