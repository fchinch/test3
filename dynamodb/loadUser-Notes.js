const {AWS} = require('../Connection/Connection');
const fs = require('fs');
const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing User-Notes into DynamoDB. Please wait.");

const notes = JSON.parse(fs.readFileSync('dataUser-Notes.json', 'utf8'));

notes.forEach(function(note) {
  console.log(note)

  const params = {
        TableName: "user-notes",
        Item: {
            "id": note.id,
            "user": note.user,
            "create_date": note.create_date,           
            "text": note.text,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add user-note", note.user, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", note.user);
       }
    });
});