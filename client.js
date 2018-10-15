// module.exports = connection; 

// config.endpoint = "~your Azure Cosmos DB account endpoint uri here~";

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




// const databaseDefinition = { id: 'sample database' };
// const collectionDefinition = { id: 'sample collection' };
// const documentDefinition = { id: 'hello world doc', content: 'Hello World!' };

// async function helloCosmos() {
//   const { database: db } = await client.databases.createIfNotExists(databaseDefinition);
//   console.log('created db');

//   const { container } = await db.containers.createIfNotExists(collectionDefinition);
//   console.log('created collection');

//   const { body } = await container.items.upsert(documentDefinition);
//   console.log('Created item with content: ', body.content);

//   // const { result } = await db.delete();
//   // console.log('Deleted database', result);
// }

// helloCosmos().catch(err => {
//   console.error(err);
// });



// const endpoint = process.env["cosmosEndpoint"];

// const masterKey = process.env["cosmosKey"];


// ADD THIS PART TO YOUR CODE

//const config = require('./config');
// const url = require('url');




// var client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });

// exports.client = client; 


// var CosmosClient = require('documentdb').CosmosClient;