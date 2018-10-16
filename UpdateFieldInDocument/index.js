const cosmos = require('./../client');
const client = cosmos.client; 

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Required Parameters: id, field, newValue 

    
    if (req.body.id && req.body.field && req.body.newValue) {
        
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

        const { result: results } = await container.items.query(querySpec).toArray(); 

        const field = req.body.field; 

        let newDoc = undefined; 
        if(results[0]){
            newDoc = JSON.parse(JSON.stringify(results[0]))
        } else {
            newDoc = {id : req.body.id.toString() }; 
        }

        newDoc[field] = req.body.newValue; 

        const { body } = await container.items.upsert(newDoc); 


        context.res = {
            // status: 200, /* Defaults to 200 */
            body: (req.body.id) + " was found... \nThis \n " + JSON.stringify(results) + " \n is now this: \n " + JSON.stringify(body) 

        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass an [id], [field], and [newValue] in your JSON body"
        };
    }
};

