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

const port = 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: "1234Katiyar@",
});

// let q =  "INSERT INTO user (id, username, email, password) VALUES ?";

// let users = [
//     ["1001", "new_user1", "new1@gmail.com", "newpass1"],
//     ["1002", "new_user2", "new2@gmail.com", "newpass2"],
// ];

let getRandomuserdata  = () => {
    return [
         faker.string.uuid(),
         faker.internet.userName(),
         faker.internet.email(),
         faker.internet.password(),
    ];
}

// let data = [];
// for(let i = 1; i<=100; i++) {
//    data.push(getRandomuserdata());
// }

// try {
//     connection.query(q, [data], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     });
// } catch (err) {
//     console.log(err);
// }

// connection.end();

app.get("/", (req,res) => {

    let q = `select count(*) from user`; // to show count of data on screen
       
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

// show

app.get("/user", (req,res) => {
     
    let q = `select * from user`;
    try {
        connection.query(q, (err, users) => {
            if(err) throw err;
           // console.log(result[0]);
            res.render("showusers", {users});
        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }
  
})

// edit route
app.get("/user/:id/edit", (req,res) => {

    let {id} = req.params;
    let q = `select * from user where id = '${id}'`; 

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render("edit", {user});
        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }
   
})

// update route
app.patch("/user/:id", (req,res) => {
    let {id} = req.params;
    let {password: formpassword, username: newusername} = req.body;
    let q = `select * from user where id = '${id}'`; 

    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            if(formpassword != user.password) {
                res.send("wrong hai!")
            } else {
                let q2 = `update user SET username = '${newusername}' where id = '${id}'`
                connection.query(q2, (err,result) => {
                    if(err) throw err;
                    res.redirect("/user");
                })
            }
        });
    } catch (err) {
        console.log(err);
        res.send("something is wrong");
    }
   
})

app.get("/user/new", (req,res) => {
    res.render("new");
})

// adding new database
app.post("/user/new", (req, res) => {
    
    let { email, password, username } = req.body;
    let id = uuidv4();

    let q2 = `INSERT INTO user (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;
    
    try {
        connection.query(q2, (err, result) => {
            if(err) throw err;          
            res.redirect("/user");
        });
    } catch (err) {
        res.send("something is wrong");
    }
});

// delete 
app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        res.render("delete", { user });
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });
  
  app.delete("/user/:id/", (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
  
        if (user.password != password) {
          res.send("WRONG Password entered!");
        } else {
          let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              console.log(result);
              console.log("deleted!");
              res.redirect("/user");
            }
          });
        }
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });

app.listen(port,() => {
    console.log("app is listening on port 8080");
})

