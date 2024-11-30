const mongoose = require('mongoose');

main().then(() => { 
    console.log("responded");
})

.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [1, "Amazon doesn't expect this Price!"]
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["fictional","non-fictional"]
    },
    genre: [String]
});

const Book = mongoose.model("Book", bookSchema);

Book.findByIdAndUpdate("66b8533ad4389047d51e412b", {price: -500}, {runValidators: true}).then((res) => {
    console.log(res);
}).catch((err) => {
         console.log(err.errors.price.properties);
      })

// const newBook = new Book({
//     title: 'Sample Book 1',
//     author: 'PK',
//     price: 100,
//     category: "fictional",
//     genre: ["comic", "autobiography"]
//   });

// newBook.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })