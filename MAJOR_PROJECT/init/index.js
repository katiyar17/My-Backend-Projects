const initData = require("./data.js");
const mongoose = require("mongoose");
const Ls = require("../md/ls.js");

main().then(() => {
    console.log("success bro!");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
}

const initDB = async () => {
    await Ls.deleteMany({});
    await Ls.insertMany(initData.data);
    console.log("initiated")
}

initDB();
