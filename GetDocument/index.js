
const client = require('./../client');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    if (req.body.sqtin) {


        // lets find that for you...


        const { container, database } = await init("sample database", "sample collection"); 

        const querySpec = {
            query: "SELECT * FROM r WHERE r.id = @id",
            parameters: [
                {
                    name: "@id",
                    value: req.body.sqtin.toString()
                }
            ]
        };

        const { result: results } = await client.database("sample database").container("sample collection").items.query(querySpec).toArray();



        var newEvent = { eventType : req.body.eventType, ts : req.body.ts }; 

        var newDoc = JSON.parse(results); 
        newDoc.yeah.events.push(newEvent); 

        const { body } = await container.items.upsert(newDoc);



        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.sqtin || req.body.sqtin) + " " + JSON.stringify(results) + " " + JSON.stringify(body) 

        };
        
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a sqtin on the query string or in the request body"
        };
    }
};

async function init(databaseId, containerId) {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    return { database, container };
}