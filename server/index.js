/**
 * Created by crist on 08/05/2017.
 */
const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');

app.use(cors());

const authCheck = jwt({
  secret: new Buffer('Ssti1K4fYBtFVjAJjl3ceuFuCcCJUkooMHfN7-Cs6OxVXLqryZgsSn9DdKrfqc8F', 'base64'),
  audience: 'Ber6lzFtBZnSg1qRUEddlteA4Esi8dWD',
});

app.get('/api/public', (req, res, next) => {
  res.json({message: "Hello from a public endpoint! You don't need to be authenticated to see this"});
});

app.get('/api/private', authCheck, (req, res, next) => {
  res.json({message: "Hello from a private endpoint! You DO need to be authenticated to see this"});
});

app.listen(3001);
console.log('Listening on local host 3001')