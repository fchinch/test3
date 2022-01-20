const {AWS} = require('../Connection/Connection');
const fs = require('fs');



const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Token Emails into DynamoDB. Please wait.");

const tokens = JSON.parse(fs.readFileSync('dataToken-Email-Lookup.json', 'utf8'));

tokens.forEach(function(token) {
  console.log(token)

  const params = {
        TableName: "token-email-lookup",
        Item: {
            "token": token.token,           
            "email": token.email,
          
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add Token Email", token.email, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", token.email);
       }
    });
});