const {AWS} = require('../Connection/Connection');


const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

function getAuthenticatedUserEmail  (token)  {
    let params = {
        TableName: "token-email-lookup",
        KeyConditionExpression: "#token = :token",
        ExpressionAttributeNames: {
            "#token": "token"
        },
        ExpressionAttributeValues: {
            ":token": token
        }
    };

    return new Promise((resolve, reject) => {
        try {
            //docClient.scan(params, onScan);
            dynamoDBClient.query(params, onQuery)

            function onQuery(err, data) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));                    
                    resolve({
                        statusCode: 400,
                        error: `Could not get user notes: ${error.stack}`
                    });
                } else {

                    // print all the Items
                    console.log("Query succeeded.");
                    resolve(data);
                   // console.log(data);
                    // data.Items.forEach(function (userNote) {
                    //     console.log(userNote.id, userNote.user, userNote.text, userNote.create_date)
                    // });

                    // if (typeof data.LastEvaluatedKey != "undefined") {
                    //     console.log("Scanning for more...");
                    //     params.ExclusiveStartKey = data.LastEvaluatedKey;
                    //     docClient.scan(params, onScan);
                    // }                  
                    //resolve({ statusCode: 200, body: JSON.stringify(data) });
                }
            }

        } catch (error) {
            throw Error(error);
        }
    });
}

async function authenticateUser(headers) {
    const authenticationHeader = headers.header('Authorization'); //headers['headers']; 
    //console.log(headers);
    // Validate the Authentication header
    
    if(typeof authenticationHeader==='undefined'){
        throw("400-Token Invalid!");
    }
    let token =authenticationHeader.replace("Bearer","").trim();
     if(token===''){
        throw("403-Token Invalid!");
    }

    const userEmail =  getAuthenticatedUserEmail(token).then(user=>{        
        if(user.Count===0){
            throw("403-Token Invalid!");
        }      
       
        return user.Items[0].email;
    }).catch((err)=>{
        throw(err); ;
    });

  return userEmail;
  
}



module.exports = {
    authenticateUser
}