const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var server = require('http').createServer(app);


// ========================= ROUTES SETUP ===============================
const adminRoute = require('./api/routes/admin-routes.js');
// const studentRoute = require('./api/routes/student-routes.js');
// const examRoute = require('./api/routes/exam-routes.js');

app.use('/admin', adminRoute.router);
// app.use('/student', studentRoute.router);
// app.use('/exam', examRoute.router);
// =======================================================================




app.get('/', function (req, res) {
    res.send('Hello World!');
  });

server.listen(PORT, async function(){
    console.log(`Server listening on "+ ${PORT}`);
})