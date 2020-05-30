const express = require("express")
var compression = require("compression")
const app = express()
require("express-ws")(app)
var httpProxy = require("http-proxy")
var apiProxy = httpProxy.createProxyServer()
// const restify = require("restify");
// const app = restify.createServer()
var port = 8000

var serverOne = "http://localhost:8000/static/"

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
// eslint-disable-next-line no-undef
app.use("/static/*", express.static(__dirname + "/../test_app/build"))

app.all("/static2/*", function (req, res) {
    console.log("redirecting to Server1")
    apiProxy.web(req, res, {
        target: serverOne,
    })
})

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

app.get("*", function (req, res) {
    console.log("404")
    res.send("<html><body><center><h1>404</h1></center></body></html)")
    // res.redirect("http://localhost:8000/static/")
})

app.listen(port, () => {
    // eslint-disable-next-line no-undef
    console.log(`App started running at ${port}\ncwd is ${__dirname}`)
})