module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const client = require('./../client');


    // context.log(client);

    // context.log(process.env["MyAccount_COSMOSDB"])

    if (req.body.sqtin) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.sqtin || req.body.sqtin)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a sqtin on the query string or in the request body"
        };
    }

    var databaseDefinition = { id: "sample database" };
    var collectionDefinition = { id: "sample collection" };
    var documentDefinition = { sqtin: req.body.sqtin, id: req.body.id, content: req.body };


    async function helloCosmos() {
        const { database: db } = await client.databases.createIfNotExists(databaseDefinition);
        console.log('created db');

        const { container } = await db.containers.createIfNotExists(collectionDefinition);
        console.log('created collection');

        const { body } = await container.items.upsert(documentDefinition);
        console.log('Created item with content: ', body.content);

        // const { result } = await db.delete();
        // console.log('Deleted database', result);
    }

    async function getData() {
        
    }

    helloCosmos().catch(err => {
        console.error(err);
    });

    // Connect to client: 

    // Get File Out if it's there

    // Write to db
};

/**
 * Create the database if it does not exist
 */
async function createDatabase() {
    const { database } = await client.databases.createIfNotExists({ id: "wee" });
    console.log(`Created database:\n${database.id}\n`);
}

/**
 * Read the database definition
 */
async function readDatabase() {
    const { body: databaseDefinition } = await client.database("wee").read();
    console.log(`Reading database:\n${databaseDefinition.id}\n`);
}
