'use strict'

var author = 'Atish Sharma'
console.log('Author : ' + author)

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
// Set port
app.set('port', (process.env.PORT || 5000))
// allows us to process data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.get('/', function(req, res){
    res.send('Hi I am a chatbot')
})

// Route for facebook messenger
app.get('/webhook/', function(req,res){
    if(req.query['hub.verify_token'] === 'blondiebytes')
        res.send(req.query['hub.challenge'])
    res.send('Wrong Token')
})

app.listen(app.get('port'), function() {
    console.log("running app")
})

