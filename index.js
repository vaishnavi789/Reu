'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

// const firebase = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");
// var surveyId = "-KjxtCvua5P5Ge_oacg9";

// var user_surveys = [];


/* List of Question */
var list_questions = ["Are you in a good mood today?", "Did you have a good nights sleep?", "What is your glucose reading??"]
var question_count = 0;

// firebase.initializeApp({
//     credential: firebase.credential.cert(serviceAccount),
//     databaseURL: "https://test-agent-8afdb.firebaseio.com"
// });

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

// function getSurveys(uid, callback) {
//     // Fetch the user's email.
//     var userRef = firebase.database().ref('/blueprints/' + uid);
//     userRef.once('value').then(function (snapshot) {
//         var surveys = snapshot.val().survey;
//         callback(surveys);
//     }).catch(function (error) {
//         console.log('Failed to send notification to user:', error);
//     });
// }

// function takeSurvey(result) {
//     if(result == undefined){
//         console.log("Undefined")
//         return {
//             "displayText": "undefined",
//             "speech": "undefined"
//         };
//     }
//     var resposes = {
//         "displayText": "",
//         "speech": ""
//     };
//     if (result.parameters.takeAnswer === 'Yes') {
//         resposes.displayText = "" + user_surveys[0].title;
//         resposes.speech = "" + user_surveys[0].title;
//     } else {
//         resposes.displayText = "Good Bye!!";
//         resposes.speech = "Good Bye!!";
//     }
//     return resposes;
// };



// function saveResponse (result, uid){
//     var answersRef = firebase.database().ref('/data/' + uid +'/answers');
//     answersRef.push(result);
//     return;
// }


/* Webhook Handler */
restService.post('/reply', function (req, res) {
    /* Accessing Intent Action Invoked */
    var action = req.body.result.action;
    if(action == "take.survey"){
        if(question_count >= list_questions.length)
            return res.json({
            speech: 'Thank you',
            displayText: 'Thank you',
            source: 'survey-demo-app'
        });
        var texts = list_questions[question_count]
        question_count++;
        console.log(texts)
        return res.json({
            speech: texts,
            displayText: texts,
            source: 'survey-demo-app'
        });
    } else {
        return res.json({
            speech: 'Thank you',
            displayText: 'Thank you',
            source: 'survey-demo-app'
        });
    }
});

/* Get Command */
restService.get('/', function (req, res) {
    return "Hey"
});

restService.listen((process.env.PORT || 8010), function () {
    console.log("Server up and listening");
});
