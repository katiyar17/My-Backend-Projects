const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Ls = require("./md/ls.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate  = require('ejs-mate');

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(() => {
    console.log("success bro!");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
}

 
// new
app.get("/ls/new", (req,res) => {
    res.render("./listings/new")
  })


app.get("/ls", async (req,res) => {
    
   const allListings =  await Ls.find({});
   res.render("./listings/index",{allListings});
})

app.get("/ls/:id", async(req,res) => {
  let {id} = req.params;
  const listing = await Ls.findById(id);
  res.render("./listings/show", {listing})
})

app.post("/ls", async (req,res) => {
    const newListing = new Ls(req.body.listing);
    await newListing.save();
    res.redirect("/ls");
})

// app.get("/ts", async (req,res) => {
//     let sampleListing = new Ls({
//        title: "My new Villa",
//        description: "its fucking crazy",
//        price: 1200,
//        location: "San Francisco",
//        country: "USA" 
//     })
//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("testing success");
// })


// edit
app.get("/ls/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Ls.findById(id);
    res.render("./listings/edit",{listing});
})
 
app.put("/ls/:id", async (req,res) => {
    let {id} = req.params;
    await Ls.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/ls/${id}`);
})

app.delete("/ls/:id", async (req,res) => {
    let {id} = req.params;
    let x = await Ls.findByIdAndDelete(id);
    console.log(x);
    res.redirect("/ls");
})

app.get("/",(req,res) => {
    res.send("working man!");
})

app.listen(7090,() => {
    console.log("app is working on port 9090");
})