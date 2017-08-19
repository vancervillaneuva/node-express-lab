const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// Get request
server.get('/posts', (req,res) => {
   res.send("hi I'm in posts");
});

// Post request
server.post('/posts',(req, res) => {
    const title = req.body.title; // entry should be { "title": "whatever you want"}
    const contents = req.body.contents; // entry should be { "title": "whatever you want",
                                     //                   "contents": "whatever you want"}
    console.log(`readInPosts: ${title} ${contents}`);
    if (!title & !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({error: 'Must provide a value post object entry'});
        return;
    }

    posts.push(title);
    posts.push(contents);
    res.json({posts});
});


module.exports = { posts, server };
