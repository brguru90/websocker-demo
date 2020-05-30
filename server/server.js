const express = require('express')
const app = express()
require('express-ws')(app)

var port = 8000

app.use(function (req, res, next) {
	console.log('middleware')
	return next()
});



app.use('/api/', require("./api/test"))
app.use('/ws/', require("./ws/chat"))




app.get('/', function (req, res) {
    console.log('get route');
    res.send("hi");
});


// app.ws('/', function (ws, req) {
//     ws.on('message', function (msg) {
//         console.log(msg);
//     });
//     console.log('socket', req.testing);
// });

app.listen(port, () => {
    console.log(`App started running at ${port}`)
})