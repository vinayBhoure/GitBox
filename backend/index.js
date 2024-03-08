 const express = require('express');
 const connectMongoDB = require('./config/connectMongoDB');
// import express from 'express';
 const app = express();

 // Load environment variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// using statc site
// app.use(express.static('dist'));

const passport = require('passport');
const session = require('express-session');

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

//connecting to cors -> cross origin resource sharing
app.use(require('cors'));

// body parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server running successfully!')
});

const userRoutes = require('./routes/userRoute');
const exploreRoutes = require('./routes/exploreRoute');
const authRoute = require('./routes/authRoute');

app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/auth', authRoute);



// listening to server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})