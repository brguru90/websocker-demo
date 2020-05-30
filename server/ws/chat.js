const express = require("express");

const router = express();
var expressWs = require('express-ws')(router);


// eslint-disable-next-line no-unused-vars
router.ws('/chat', function (ws, req) {

    console.log(ws.readyState)

    let timeout = setTimeout(() => {
        try {
            if (ws.readyState <= 2) {
                ws.send("timeout2");
                ws.close()
            }
        } catch (error) {
            console.log(error)
        }
        clearTimeout(timeout)
    }, 5000);

    ws.on('message', function (msg) {
        console.log(msg);
        expressWs.getWss().clients
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            try {
                if (ws.readyState <= 2) {
                    ws.send("timeout2");
                    ws.close()
                }
            } catch (error) {
                console.log(error)
            }
            clearTimeout(timeout)
        }, 5000);
        ws.send(msg);
    });
    ws.on('close', function () {
        console.log("connection closed");
    });

    ws.on('error', function (err) {
        console.log(err);
    });
    console.log('socket');
});


module.exports = router;