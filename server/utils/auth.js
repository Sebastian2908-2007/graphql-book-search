const jwt = require('jsonwebtoken');
require('dotenv').config();
// set token secret and expiration date
const secret = `${process.env.SECRET}`;
const expiration = '5h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // seperate ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      
    }
// return updated req object
   return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

/**
 * 
 * {
  "data": {
    "addUser": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibGltbXkiLCJlbWFpbCI6ImxpbW15QGdtYWlsLmNvbSIsIl9pZCI6IjYyNjMwYjliOTJiZTMzNDk1NGZmZjg0MSJ9LCJpYXQiOjE2NTA2NTgyMDMsImV4cCI6MTY1MDY2NTQwM30.6WzkWV7UrvoxIsECGfb_Tj8ewPtCao1dehigAQ7i_rA",
      "user": {
        "email": "limmy@gmail.com",
        "username": "limmy"
      }
    }
  }
}
 */
