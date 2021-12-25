const express = require('express')
const app = express()
const Router = express.Router();
require('dotenv').config()
const path = require('path');





//parse inc request bodies to JSON
app.use(express.json())

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//first Route auth routes
const userRoute = require('./routes/user')
const postRoute = require('./routes/posts')
app.use('/api/auth/', userRoute)
app.use('/api/posts/', postRoute)


//second Route for sauces!
// const saucesRoute = require('./routes/sauces')
// app.use('/api/sauces',saucesRoute)

// app.use('/images',express.static(path.join(__dirname,'images')));




app.listen(process.env.PORT)
console.log("Server Started, listening on PORT:" + process.env.PORT)