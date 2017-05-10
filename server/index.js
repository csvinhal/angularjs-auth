/**
 * Created by crist on 08/05/2017.
 */
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');

app.use(cors());

const authCheck = jwt({
  secret: new Buffer('YOUR_AUTH0_SECRET', 'base64'),
  audience: 'YOUR_AUTH0_CLIENT_ID'
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authCheck, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');