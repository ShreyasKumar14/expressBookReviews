const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const user = {username:req.body.username,password:req.body.password}
    const userCheck = (item) =>{
      return item!=user
    }
    const check = users.every(userCheck)
    if(check){
      users.push(user);
      return res.status(200).json({"message":"Customer successfully registered. Now you can login"});
    }else{
        return res.status(200).json({"Message":"Customer already exists!"})
    }

});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  books = await JSON.stringify(books)
  return res.status(200).send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  const book = await books[req.params.isbn]
  return res.status(200).send(JSON.stringify(book));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const filteredBooks=[]
    for(const key in books){
        if(books[key].author==req.params.author){
            filteredBooks.push({isbn:key,title:books[key].title,reviews:books[key].reviews})
        }
  }
  return res.status(200).send({"booksbyauthor":filteredBooks});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const filtered = []
  for(const key in books){
    if(books[key].title==req.params.title){
        filtered.push({isbn:key,author:books[key].author,reviews:books[key].reviews})
    }
  }
return res.status(200).send({filteredbytitle:filtered})}
)

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.status(200).send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
