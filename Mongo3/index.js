const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const path = require("path");
const Chat = require('./models/chat');
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index route
app.get("/chats", async(req,res) => {
    let chats = await Chat.find();
  //  console.log(chats);
    res.render("index.ejs", {chats});
})

// edit route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  // Search the chat that we want to edit
  let chat = await Chat.findById(id);
  res.render("edit", { chat });
})

// UPDATE ROUTE
app.put("/chats/:id", async (req,res) => {
  let { id } = req.params;
  let {msg: newmsg} = req.body;
  // first we need to find the data with help of id then update
  let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newmsg},
    {runValidators: true, new: true});
   console.log(updatedChat);
   res.redirect("/chats");
})

// APP.DELETE
app.delete("/chats/:id", async (req,res) => {
   // first we need to find the data with help of id then delete
   
   let { id } = req.params;
   let deleted_chat = await Chat.findByIdAndDelete(id);
   console.log(deleted_chat);
   res.redirect("/chats");

} )

app.get("/", (req,res) => {
    res.send("Working");
})

// new route
app.get("/chats/new", (req,res) => {
   res.render("new");
})

// create route  post req to receive form data and add into database
app.post("/chats", (req,res) => {
  let {from, to, msg} = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date() 
  });
  newChat.save().then((res) => {console.log("chats are saved")}).catch((err) => {console.log(err)});
  res.redirect("/chats");
})

app.listen(port,() => {
    console.log("listening on 8080");
})