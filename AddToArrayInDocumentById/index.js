
const cosmos = require('./../client');
const client = cosmos.client; 

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Required Parameters: id, event object 
    // Optional Parameters: database, collection name, other parameters... 

    // If there are no documents in the DB with that ID we need to create a Document. 


    if (req.body.id) {

        const { container, database } = await cosmos.init("sample database", "sample collection"); 

        const querySpec = {
            query: "SELECT * FROM r WHERE r.id = @id",
            parameters: [
                {
                    name: "@id",
                    value: req.body.id.toString()
                }
            ]
        };

        const { result: results } = await client.database("sample database").container("sample collection").items.query(querySpec).toArray();
        const { result: r } = await container.items.query(querySpec).toArray(); 


        var newEvent = { eventType : req.body.eventType, ts : req.body.ts }; 

        var newDoc = (results[0]); 
        newDoc.content.events.push(newEvent); 

        const { body } = await container.items.upsert(newDoc);



        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.id || req.body.id) + " " + JSON.stringify(results) + " " + JSON.stringify(body) 

        };
        
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a id on the query string or in the request body"
        };
    }
};

