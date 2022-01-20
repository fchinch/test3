const {AWS} = require('../Connection/Connection');

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName : "token-email-lookup"
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});