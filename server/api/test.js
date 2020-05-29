const express = require("express");
const router = express.Router();


router.use((req, res, next) => {
    // // console.log(req.body)
    console.log("----------/api/test.js-------------")
    next();
})


router.all('/test',  (req, res) =>{
    console.log('api/test.js');
    res.send("api/test.js");
});

module.exports = router;
