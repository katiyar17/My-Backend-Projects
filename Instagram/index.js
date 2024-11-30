const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 }  = require('uuid');
const methodOverride = require("method-override");

const port = 8010;

app.use(express.urlencoded( { extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req,res) => {
    res.send("working", {posts});
})

let posts = [
    {
        id: uuidv4(),
        image: "https://4kwallpapers.com/images/walls/thumbs_3t/17094.jpg",
        caption: "Jaguar!",
        description: "I am very danger. I can eat you."
    },
    {   id: uuidv4(),   
        image: "https://4kwallpapers.com/images/walls/thumbs_3t/6292.jpg",
        caption: "We are together",
        description: "I really want to meet you. You are special for me."
    },
    {   id: uuidv4(),
        image: "https://4kwallpapers.com/images/walls/thumbs_3t/17201.jpg",
        caption: "Its nature vibes!",
        description: "Welcome under these beautiful trees. Nature is your friend"
    }
]

app.get("/posts", (req,res) => {
    res.render("index", {posts});
})

// post req to receive new post data and add into our array
app.post("/posts", (req,res) => {

    let {image, caption, description} = req.body;
    posts.push({image, caption, description});
   
    res.redirect("/posts"); 
})


app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
     
    let post = posts.find((p) => p.id === id); // Compare directly with p.id
    
    res.render("show", { post });
});

// update route
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newdesc = req.body.description
    let post = posts.find((p) => id === p.id);
     post.description = newdesc;
     res.redirect("/posts"); 
})

app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit", { post });
})

app.delete("/posts/:id", (req,res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.get("/posts/new", (req, res) => {
    console.log("hai")
    res.render("new");
})

app.listen(port, () => {
    console.log("app is listening on 8010 port");
})