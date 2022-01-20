const {AWS} = require('../Connection/Connection');



const dynamodb = new AWS.DynamoDB();

const params = {
    TableName : "token-email-lookup",
    KeySchema: [
        { AttributeName: "token", KeyType: "HASH"},  //Partition key
        //{ AttributeName: "email", KeyType: "RANGE"}, 

    ],
    AttributeDefinitions: [
        { AttributeName: "token", AttributeType: "S" },
        // { AttributeName: "email", AttributeType: "S" },

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});