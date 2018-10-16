
const cosmos = require('./../client');
const client = cosmos.client; 

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Required Parameters: id, event object 
    // Optional Parameters: database, collection name, other parameters... 

    // If there are no documents in the DB with that ID we need to create a Document. 


    if (req.body.id && req.body.eventType) {

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

        // Get the current entry from the database:
        const { result: results } = await container.items.query(querySpec).toArray(); 

        // create the event to append to events array in document: 
        const newEvent = { eventType : req.body.eventType, ts : req.body.ts }; 

        // create an empty document to upsert if no id is found in collection: 
        let blankEntry = { id : req.body.id.toString(), "events" : [] };

        // get the new document in place - either the result or a blank entry
        let newDoc = results[0] || blankEntry; 

        // push our event from the request into the 'newish' document 
        newDoc.events.push(newEvent); 

        // upsert our document! 
        const { body } = await container.items.upsert(newDoc);


        context.res = {
            // status: 200, /* Defaults to 200 */
            body: (req.query.id || req.body.id) + " was found... \nThis \n " + JSON.stringify(results) + " \n is now this: \n " + JSON.stringify(body) 

        };
        
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an id on the request body"
        };
    }
};

