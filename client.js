// module.exports = connection; 

function connection() {
    return { "data": "here you go" };
}

// config.endpoint = "~your Azure Cosmos DB account endpoint uri here~";

const endpoint = "https://Ncosmos.documents.azure.com:443/";
const masterKey = "YNlpMSRAIYbPouQKFd0YKV0qf2zgbuN03Lxfs5xWb7huc5SbXpfQDRWuk7KhRXlD8CeY7oHsKUrjguJV2bBhOA==";


// const endpoint = process.env["cosmosEndpoint"];

// const masterKey = process.env["cosmosKey"];


// ADD THIS PART TO YOUR CODE

//const config = require('./config');
const url = require('url');




// var client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });

// exports.client = client; 


// var CosmosClient = require('documentdb').CosmosClient;

const cosmos = require('@azure/cosmos');
const CosmosClient = cosmos.CosmosClient;

const client = new CosmosClient({ endpoint, auth: { masterKey } });

module.exports = client;

const databaseDefinition = { id: 'sample database' };
const collectionDefinition = { id: 'sample collection' };
const documentDefinition = { id: 'hello world doc', content: 'Hello World!' };

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