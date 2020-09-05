const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const { randomBytes } = require("crypto")

const commentsByPostId = {}
app.get("/posts/:id/comments", (req,res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post("/posts/:id/comments", (req,res) => {
    const commentId = randomBytes(4).toString("hex")
    const postId = req.params.id
    const {content} = req.body
    const comments = commentsByPostId[postId] || [];

    comments.push({ id : commentId, content});
    commentsByPostId[postId] = comments
    res.statusCode(201).send(comments)
})

app.listen(4001, () => {
    console.log("Listening on post 4001");
})