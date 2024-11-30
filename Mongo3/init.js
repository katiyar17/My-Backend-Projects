const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "rohan",
        to: "anaya",
        msg: "Hey Anaya, did you get the email?",
        created_at: new Date()
    },
    {
        from: "karan",
        to: "riya",
        msg: "Riya, are you joining the meeting later?",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "shruti",
        msg: "Shruti, can you share the document with me?",
        created_at: new Date()
    },
    {
        from: "preet",
        to: "rohan",
        msg: "Rohan, let's finalize the presentation today.",
        created_at: new Date()
    },
    {
        from: "anaya",
        to: "karan",
        msg: "Karan, what's the status of the project?",
        created_at: new Date()
    },
    {
        from: "riya",
        to: "neha",
        msg: "Neha, did you get a chance to review the report?",
        created_at: new Date()
    },
    {
        from: "shruti",
        to: "preet",
        msg: "Preet, let's meet up after work.",
        created_at: new Date()
    },
    {
        from: "rohan",
        to: "karan",
        msg: "Karan, can we discuss the budget later?",
        created_at: new Date()
    },
    {
        from: "anaya",
        to: "neha",
        msg: "Neha, I need your help with the analysis.",
        created_at: new Date()
    },
    {
        from: "riya",
        to: "shruti",
        msg: "Shruti, do you want to join us for lunch?",
        created_at: new Date()
    }
];

Chat.insertMany(allChats); 

