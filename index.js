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
    res.send('Hi I am a chatbot 0.1')
})

// Route for facebook messenger
app.get('/webhook/', function(req,res){
    if(req.query['hub.verify_token'] === 'test-token')
        res.send(req.query['hub.challenge'])
    res.send('Wrong Token')
})

app.post('/webhook/', function(req, res){
    let messaging_events = req.body.entry[0].messaging
    for(let i = 0; i< messaging_events.length; i++){
        let event = messaging_events[i]
        let sender = event.sender.id
        if(event.message && event.message.text) {
            let text = event.message.text
            sendText(sender, "Text echo: " + text.substring(0,100))
        }
    }
    res.sendStatus(200)
})

let token = "EAAIe3eZAXcakBAIlYXuZC8ZCkuZCZCARMdkBI6t2p8yxJNX2BWDSFC179uKrvpUbxJ80pMJaxSzrCQKH8g5vO3YRDo0gpHAmU3myYbJj6XFwfZA9XmBkXsLcjBnM2kv4e2ptH6xNaNDYTB8bU6ra3brZCnMcNSvYAUlA4AmDVW0xQ8TU8b8PPof"

function sendText(sender, text){
    let messageData = {text: text}
    request({
        url: "https://graph.facebook.com/v7.0/me/messages",
        qs: {access_token: token},
        method: "POST",
        json: {
            recipient : {id : sender},
            message : messageData
        }
    }, function(error, response, body) {
        if(error){
            console.log("sending error")
        } else if (response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'), function() {
    console.log("running app")
})

