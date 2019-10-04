const serverless = require('serverless-http');
const dbConnection =  require('./dbConnection')
const server = require('./app');
const handler = serverless(server);

let pool; // Remains the pool while the lambda is hot
module.exports.hello = async (event, context) => {
    pool = await dbConnection.createDatabasePool(pool);
    return await handler(event, context);
};