const bodyParser = require('body-parser'); //Import the body parser dependency for url encoded body 
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 3000;                  //Save the port number where your server will be listening

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Idiomatic expression in express to route and respond to a client request
app.get('/studentInfo', (req, res) => {        //get requests to the root ("/") will route here
    return res.status(200).send("Success return sample get in nodejs");      //server responds by sending the index.html file to the client's browser
                                                                            //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post('/studentInfo',  urlencodedParser, (req, res) => {
    const reqBody = req.body;
    console.log(reqBody.firstName);
    
    //Validations
    if(reqBody.firstName.match(/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g)){
        return res.status(400).send("Invalid Input for Firstname! The input has special characters!");
    }
    if(reqBody.lastName == "" || reqBody.lastName == null ){
        return res.status(400).send("Invalid Input for LastName! Lastname is required!");
    }
    if(reqBody.middleName.length <= 3 ){
        return res.status(400).send("Invalid Input for Middlename! Middlename should be more than 3 characters!");
    }
    if(reqBody.age.match(/^[a-zA-Z!@#\$%\^\&*\)\(+=._-]+$/g)){
        return res.status(400).send("Invalid Input for Age! The input has special characters!");
    }
    if(reqBody.age.length > 2){
        return res.status(400).send("Invalid Input for Age! Age length should only be 2 numbers/characters!");
    }  


    return res.status(200).send("Successfully saved.");
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});