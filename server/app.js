const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cookieSession = require("cookie-session")
const path = require("path")
require('./auth')
const app = express()
const {routerAdmin} = require('./routes/route_admin');
const {routerGUser} = require('./routes/route_g_user');
const {routerUser} = require('./routes/route_user');
var cors = require('cors')
const mongoose = require('mongoose')
const mongoDB = process.env.mongoDB

mongoose.connect(mongoDB,{
    useNewUrlParser : true, useUnifiedTopology : true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });


app.use(express.json());       
app.use(express.urlencoded({extended: true}));
//connection with frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
); 


app.use(
	cookieSession({
		name: "session",
		keys: ["aniketkundu"],
		maxAge: 30* 24 * 60 * 60 * 1000,  //30 days logged in
	})
);
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: 'http://localhost:4000',
    failureRedirect: 'http://localhost:4000'
  })
);
app.get('/logout', function(req, res) {
  req.logout();
	res.redirect('http://localhost:4000');
});





app.use('/user', routerUser)
app.use('/g_user', routerGUser)
app.use('/admin', routerAdmin)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server port :${PORT} `)
})
