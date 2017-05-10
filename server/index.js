/**
 * Created by crist on 08/05/2017.
 */
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

app.use(cors());

const YOUR_AUTH0_DOMAIN = "";
const YOUR_AUTH0_API_AUDIENCE = "";
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${YOUR_AUTH0_DOMAIN}.auth0.com/.well-known/jwks.json`
  }),
  audience: `${YOUR_AUTH0_API_AUDIENCE}`,
  issuer: `https://${YOUR_AUTH0_DOMAIN}.auth0.com/`,
  algorithms: ['RS256']
});


app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authCheck, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');