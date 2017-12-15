const express = require('express')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)

const models = require('./models')
const schema = require('./schema/schema')
const passportConfig = require('./services/auth')

const app = express()

// Setup MongoDB
const MONGO_URI = 'mongodb://localhost:27017/lyricaldb'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}
mongoose.connect(MONGO_URI, { useMongoClient: true })
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance:', MONGO_URI))
  .on('error', error => console.log('Error connecting to MongoDB:', error))

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
)

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also services/auth.js
app.use(passport.initialize())
app.use(passport.session())

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
)

app.listen(3001, () => {
  console.log('Express GraphQL is listening on port 3001')
})
