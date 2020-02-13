const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const credentials = require('./credentials.json');
const cors = require('cors');
var qs = require('querystring');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

var email = credentials.client_email;
var key = credentials.private_key;

const jwt = new google.auth.JWT(
  email, null, key, SCOPES
);

jwt.authorize((err, data) => {
  if (err) {
    console.error(err);
    throw err;
  }    
  console.log('You have been successfully authenticated: ', data);
  listEvents(jwt);
  callback(jwt);
});

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
var events;
var projectCal;

function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: '8tb5rnfc67hf34g2iu66qavmvk@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
  projectCal = calendar
}

// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.

var event = {
  'summary': 'Google I/O 2015',
  'location': 'Lincoln, NE',
  'description': 'A chance to hear more about Google\'s developer products.' + "\n" + 'test',
  'start': {
    'dateTime': '2020-02-28T7:00:00-05:00',
    'timeZone': 'America/Chicago',
  },
  'end': {
    'dateTime': '2020-02-28T14:00:00-05:00',
    'timeZone': 'America/Chicago',
  },
};

function createEvent(event, auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    auth: auth,
    calendarId: '8tb5rnfc67hf34g2iu66qavmvk@group.calendar.google.com',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.data.htmlLink);
  });
}



const express = require('express');
const app = express();
const  router  =  express.Router();
app.use(cors())

router.get('/', (req, res) => {
  // createEvent(req, jwt);
  res.status(200).send('This is Pilkington Reporting');
});

router.post('/register', (req, res) => {
  var body = '';

  req.on('data', function (data) {
    body += data;

    if (body.length > 1e6)
      req.connection.destroy();
  });

  req.on('end', function () {
    var post = qs.parse(body);
    console.log(post);
    const calendar = google.calendar({version: 'v3', jwt});
    calendar.events.insert({
      auth: jwt,
      calendarId: '8tb5rnfc67hf34g2iu66qavmvk@group.calendar.google.com',
      resource: post
    },function(err, post) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', post.data.htmlLink);
    });
  })
  
  
  res.send("Success");
});

app.use(router);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server listening at http://localhost:'  +  port);
});