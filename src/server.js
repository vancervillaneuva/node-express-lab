const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

// Get request
server.get('/posts', (req,res) => {
   //res.send("hi I'm in posts");
   res.json({posts});
});

// Post request
server.post('/posts',(req, res) => {
    const title = req.body.title; // entry should be { "title": "whatever you want"}
    const contents = req.body.contents; // entry should be { "title": "whatever you want",
                                     //                   "contents": "whatever you want"}
    console.log(`readInPosts: ${title} ${contents}`);
    
    const postEntry = {
          id: id.toString(),
          title: title,
          contents: contents,
    };
    
    id = id + 1;

    if (!title & !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({error: 'Must provide a value post object entry'});
        return;
    }
    
    posts.push(postEntry);
    //posts.push(title);
    //posts.push(contents);
    res.json({posts});
});


//Put request
server.put('/posts',(req, res) => {
    const id = req.body.id;
    const title = req.body.title; // entry should be { "title": "whatever you want"}
    const contents = req.body.contents; // entry should be { "title": "whatever you want",
                                     //                   "contents": "whatever you want"}
    console.log(id);
    console.log(title);
    console.log(contents);
    
    if (!id) {
        res.status(STATUS_USER_ERROR);
        res.json({error: 'Must provide a value post object entry'});
        return;
    }

    posts.forEach((entry, i) => {
        if (entry.id === id) {
            const newData = {
                id: id,
                title: title,
                contents: contents,
            }
            posts[i] = newData;
        }
    });
    

    res.json({posts});
});


// Delete request
server.delete('/posts/:id',(req, res) => {
    const { id } = req.params;

    posts.forEach((entry, i) => {
        if (entry.id === id) {
            posts.splice(i,1);
        }
    });

    res.json({posts});
});



module.exports = { posts, server };
