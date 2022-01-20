const {AWS} = require('../Connection/Connection');

let docClient = new AWS.DynamoDB.DocumentClient();

function queryUserNotes(user) {
    //const dateNow = new Date().toISOString();
    //console.log(dateNow);

    let params = {
        TableName: "user-notes",
        //ProjectionExpression: "#id, #user, #create_date, #text",    
        //FilterExpression: "#user = :user",
        KeyConditionExpression: "#user = :user",   
        ExpressionAttributeNames: {
            //"#id": "id",
            "#user": "user",
            // "#create_date": "create_date",
            // "#text": "text"
        },
        ExpressionAttributeValues: {
            ":user": user
        },
        ScanIndexForward: false,
        Limit:10,
    };
    console.log("Scanning User Notes table.");

    return new Promise((resolve, reject) => {
        try {
            //docClient.scan(params, onScan);
            //docClient.scan(params).eachPage(onScan);
            docClient.query(params, onScan)

            function onScan(err, data) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));                    
                    resolve({
                        statusCode: 400,
                        error: `Could not get user notes: ${error.stack}`
                    });
                } else {

                    // print all the Items
                    console.log("Query succeeded.");
                    // data.Items.forEach(function (userNote) {
                    //     console.log(userNote.id, userNote.user, userNote.text, userNote.create_date)
                    // });

                    // if (typeof data.LastEvaluatedKey != "undefined") {
                    //     console.log("F for more...");
                    //     console.log(data.LastEvaluatedKey);
                    //     params.ExclusiveStartKey = data.LastEvaluatedKey;
                    //     docClient.query(params, onScan);
                    // }

                    resolve(data);
                    //resolve({ statusCode: 200, body: JSON.stringify(data) });
                }
            }

        } catch (error) {
            throw Error(error);
        }

    })


}



module.exports = {
    queryUserNotes
}