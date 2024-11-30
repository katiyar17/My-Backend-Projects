const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const port = "9080";

const connection = mysql.createConnection({
    host: 'localhost',
    users: 'root',
    database: 'delta_app',
    password: "1234Katiyar@",
});


// count on home
app.get("/", (req,res) => {
    let q = `select count(*) from users`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home", {count});
        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }
})


// show route
app.get("/data",(req,res) => {
    
    let q = `select * from users`;
    
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let mydata = result;
            res.render("show", {mydata});
        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }
})

// edit
app.get("/data/:id/edit", (req,res) => {

    let {id} = req.params;
    let q = `select * from userss where id = '${id}'`; 
    
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let mydata = result[0];
            res.render("edit", {mydata});
        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }
})

app.patch("/data/:id", (req,res) => {

    let {id} = req.params;
    let {password: np, usersname: nm} = req.body;
    
    let q = `select * from users where id = '${id}'`; 

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let mydata = result[0];
    
    if(mydata.password != np) {
        res.send("wrong password");
    } else {
        let q2 = `update userss SET usersname = '${nm}' where id = '${id}'`
                connection.query(q2, (err,result) => {
                    if(err) throw err;
                    res.redirect("/data");
                })
    }

        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }

})

app.get("/data/new", (req,res) => {
    res.render("new");
})

app.post("/data/new", (req,res) => {
   
    let { email, password, usersname } = req.body;
    let id = uuidv4(); // generating new id for my newupcoming database

    let q2 = `INSERT INTO userss (id, usersname, email, password) VALUES ('${id}', '${usersname}', '${email}', '${password}')`;
    
    try {
        connection.query(q2, (err, result) => {
            if(err) throw err;          
            res.redirect("/data");
        });
    } catch (err) {
        res.send("something is wrong");
    }
})



let getRandomusersdata  = () => {
    return [
         faker.string.uuid(),
         faker.internet.usersName(),
         faker.internet.email(),
         faker.internet.password(),
    ];
}

app.listen(port,() => {
    console.log("app is listening on port 9080");
})