const express = require('express');
const app = express();
require('dotenv').config();


const session = require('express-session');
const passport = require('passport');
require('./passport/config');

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
    res.send('server successfully running');
})

const userProfile = require('./routes//userProfile');
app.use('/api/users', userProfile);
const explore = require('./routes/explore');
app.use("/api/explore", explore)
const authRoute = require('./routes/authRoute');
app.use("/api/auth", authRoute)


const connectDB = require('./db/connectDB');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});