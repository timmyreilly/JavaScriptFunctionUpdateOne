const cosmos = require('@azure/cosmos');

// local.settings.json will also get picked up by process.env
console.log('CosmosEndpoint: ' + process.env['cosmosEndpoint'] || 'please define cosmosEndpoint in local.settings.json or app settings'); 
const endpoint = process.env['cosmosEndpoint'];
console.log('CosmosKey: ' + process.env['cosmosKey'] || "please define cosmosKey in local.settings.json or app settings");
const masterKey = process.env['cosmosKey'];

const client = new cosmos.CosmosClient({endpoint, auth: {masterKey } });


async function init(databaseId, containerId) {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    return { database, container };
}

const c = {
    client: client, 
    init: init 
}

module.exports = c;
