const express = require("express");
const fs = require("fs");


const app = express();
const port = 8080;


app.get("/todolist", (req, res) => {
    
    //Extract the username from the get request
    const username = req.query.name;    
    
    //Read and parse json file
    let jsonDB = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    
    console.log(jsonDB);

    res.send(JSON.stringify({
        msg : `Hello ${username}`
    }));

});



app.listen(port, (err) => {
   
    if (err) {
        console.log(err);
    }


    console.log(`Listening on ${port}`);
});


// Based upon a username 
// Simple String

// We want to build a simple todo list app for individual users.
// Todo will include
    
    // Title text
    // Body text
    // Time information
    // Complete or not