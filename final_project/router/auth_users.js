const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const user = {username:req.body.username,password:req.body.password} 
  const result = users.find((i)=>{return i.username==user.username && i.password==user.password})

  if(result!=undefined){
    res.status(200).send("Customer logged in successfully")
  }else{
    res.status(400).send("User Not Found!")
  }
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  books[req.params.isbn].reviews=req.query.review
  res.status(200).send(`The review for the book with ISBN ${req.params.isbn} has been added/updated!`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
