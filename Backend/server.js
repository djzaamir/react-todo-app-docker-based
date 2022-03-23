const express = require("express");
const fs = require("fs");

const app = express();


//Add support for json parsing
app.use(express.json());

const port = 8080;

const dbFileName = "./db.json";

//Simple Database storage schema

// Data is distinguised based upon
// Based upon a username  [Simple String]

// We want to build a simple todo list app for individual users.
// Todo will include
    
    // Title text [String]
    // Body text [String]
    // Time information [Date]
    // Complete or not [Boolean]

app.get("/todolist", (req, res) => {
    
    //Extract the username from the get request
    const user = req.query.name;    

    //Read and parse json file
    let jsonDB = JSON.parse(fs.readFileSync(dbFileName , "utf-8"));
    
    let usernames = Object.keys(jsonDB);

    let found = false;
    
    //Might be refactored
    for (let i = 0; i < usernames.length; i++)
    {
        if (usernames[i] === user) {
            found = true;
            break;
        }
    }


    //The response todos will contain a fetched array or an empty array 
    //depending on the presence of the user in the database
    let responseTodos = null;

    if (found) {
        
        //Will extract the entire db structure against particular user
        responseTodos= jsonDB[user];
    } else {
        
        //Create a new user in the DB
        //create an empty array against the username
        //Array will contain objects for the todos
        jsonDB[user] = []

        fs.writeFileSync(dbFileName, JSON.stringify(jsonDB));

        responseTodos = [];
    }
    
    //Response
    res.send(JSON.stringify({
        todos: responseTodos
    }));

});

app.post("/addTodo", (req, res) => {

    //TODO prevent users to access this route wihout any logged in

    //Will also contain the username
    //Will be extracted from the post request
    //Will contain the  title, body text, time date, boolean 
    const todoObject = req.body;


    //Read and parse json file
    let jsonDB = JSON.parse(fs.readFileSync(dbFileName, "utf-8"));
    

    jsonDB[todoObject["username"]] = todoObject["todos"];

    fs.writeFileSync(dbFileName, JSON.stringify(jsonDB));


    res.send(JSON.stringify({
        msg: "Record created Succesfully"
    }));
});



//Start listening on particular
app.listen(port, (err) => {
   
    if (err) {
        console.log(err);
    }


    console.log(`Listening on ${port}`);
});


