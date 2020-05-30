const express = require("express")
var compression = require("compression")
const app = express()
// const restify = require("restify");
// const app = restify.createServer()
require("express-ws")(app)

var port = 8000

app.use(function (req, res, next) {
    console.log("middleware")
    return next()
})

// eslint-disable-next-line no-undef
app.use(compression())
app.use(
    express.json({
        limit: "50mb",
        extended: false,
    })
)
// eslint-disable-next-line no-undef
app.use("/", express.static(__dirname + "/../test_app/build"))
app.use("/api/", require("./api/test"))
app.use("/ws/", require("./ws/chat"))

// app.get("/", function (req, res) {
//     console.log("get route")
//     res.send("hi")
// })

// app.ws('/', function (ws, req) {
//     ws.on('message', function (msg) {
//         console.log(msg);
//     });
//     console.log('socket', req.testing);
// });

// eslint-disable-next-line no-undef
console.log(`DocumentRoot ${__dirname + "/../test_app/build"}`)

app.listen(port, () => {
    // eslint-disable-next-line no-undef
    console.log(`App started running at ${port}\ncwd is ${__dirname}`)
})