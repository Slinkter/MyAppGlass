const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

/**
 * Test HTTP function using Firebase Functions V2 syntax.
 * This function responds with a simple JSON message.
 */
exports.helloWorldV2 = onRequest((request, response) => {
  logger.info("Hello from Firebase Functions V2!", { structuredData: true });
  response.json({
    message: "Hello from Firebase Functions V2!",
    timestamp: new Date().toISOString(),
  });
});
