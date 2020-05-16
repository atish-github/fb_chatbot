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
    if(req.query['hub.verify_token'] === 'Testing Chat Bot')
        res.send(req.query['hub.challenge'])
    res.send('Wrong Token')
})

app.post('/webhook/', function(req, res){
    let messaging_events = req.body.entry[0].messaging_events
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

let token = "EAAIe3eZAXcakBAL0hUgDPSiV0H7vD3ONCs5w7Vnk3hKb96jJiGImbrITh7IxGZCrYWcxM8ZCI6GqgAYBEtgJo9K2tZAqdLo6HrOQWfZAOPwXjiYwGOrOJIXkQkbDDLslbfgB1Amu4ZCfli4G8tZCCqqv7Rus9VvOZBpIhDlfvCAmveUcupuSSCxb"

function sendText(sender, text){
    let messageData = {text: text}
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token, token},
        method: "POST",
        json: {
            receipt : {id : sender},
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

