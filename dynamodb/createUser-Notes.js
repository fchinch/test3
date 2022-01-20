const {AWS} = require('../Connection/Connection');

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName : "user-notes",
    KeySchema: [
        { AttributeName: "user", KeyType: "HASH"},  //Partition key       
        { AttributeName: "create_date", KeyType: "RANGE"}
        
    ],
    AttributeDefinitions: [
        { AttributeName: "user", AttributeType: "S" },        
        { AttributeName: "create_date", AttributeType: "S" },
        // { AttributeName: "user", AttributeType: "S" },
        // { AttributeName: "text", AttributeType: "S" }

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