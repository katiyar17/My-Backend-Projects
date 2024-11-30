const mongoose = require('mongoose');

main().then(() => { 
    console.log("responded");
})

.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})
const User = mongoose.model("User", userSchema);

// User.insertMany([
//     {name: "Preet", email: "p3@gmail.com"},
//     {name: "Priya", email: "xha3d@gmail.com"},
// ]).then((res) => {
//     console.log(res);
// })

// User.findById({ _id: "66af77fc7e1c6259039e2bac"}).then((res) => {
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// User.updateMany({name: {$gt: "Alex"}}, {age: 117}).then((res) => {
//      console.log(res);
// }).catch(err => {console.log(err)});

// User.findOneAndUpdate({name: "Preet"}, {age: 18}).then((res) => {
//      console.log(res);
// }).catch(err => {console.log(err)});

User.findByIdAndDelete("66af72133ad4e49c65731948").then((res) => {
  console.log(res);
})

// const user1 = new User(({
//     name: "Adam",
//     email: "adam22@gmail.com",
//     age: 19,
// }))

// const user2 = new User(({
//     name: "Alex",
//     email: "alex22@gmail.com",
//     age: 17,
// }))


// user2.save().then((res) => { // returns promise if it resolved then print res else catch error
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })