const AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "xxxxxx",
    secretAccessKey: "xxxxxx"
    //aws_sdk_load_config = 1
});


module.exports = {
    AWS
}