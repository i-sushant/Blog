const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
const axios = require('axios');

app.use(bodyParser.json())
app.use(cors())
const { randomBytes } = require("crypto")

const commentsByPostId = {}
app.get("/posts/:id/comments", (req,res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments",async (req,res) => {
    const commentId = randomBytes(4).toString("hex")
    const postId = req.params.id
    const {content} = req.body
    const comments = commentsByPostId[postId] || [];

    comments.push({ id : commentId, content, status : 'pending'});
    commentsByPostId[postId] = comments
    await axios.post('http://localhost:4005/events', {
        type : 'CommentCreated',
        data : {
            id : commentId,
            content,
            postId,
            status:'pending'
        }
    })
    res.statusCode(201).send(comments)
})
app.post('/events', async (req,res) => {
    const {type, data } = req.body
    if(type === 'CommentModerated') {
        const {postId, id, status} = data
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;
        await axios.post('http://localhost:4005', {
            type : 'CommentUpdated',
            data : {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({})
})
app.listen(4001, () => {
    console.log("Listening on post 4001");
})