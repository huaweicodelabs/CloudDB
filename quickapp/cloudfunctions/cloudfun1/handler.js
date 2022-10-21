//handler.js is a demo for handler function.

let myHandler = function(event, context, callback, logger) {
    let res = new context.HTTPResponse({"simple": "example"}, {
        "res-type": "simple example", 
        "faas-content-type": "json"
    }, "application/json", "200");

    //send info log
    logger.info("this is message of debug log");

    //send info log
    logger.info("this is message of error log");

    //send response
    callback(res);
};

module.exports.myHandler = myHandler;