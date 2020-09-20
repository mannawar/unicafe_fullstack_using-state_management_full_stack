const config = require('./utils/config')
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const Feed = require("./models/feed");
const app = express();
const cors = require('cors');
const router = express.Router();
const middleware = require('./utils/middleware')

//connect to database
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
})

.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(middleware.requestLogger)


//controller/routes
//get
router.get("/getData", async (req,res) => {
    Feed.find((err, feed) => {
        if(err) return res.json({Success: false, error: err })
        return res.json({Success: true, feed: feed})
    })
})


//post in db
router.post("/putData", (req, res) => {
    let feed = new Feed();

    let { good, neutral, bad, Total, Average, reset } = req.body;
    if((good && neutral) || (neutral && bad) || (neutral && good) || (neutral && bad && good)) {
        return res.json({ Success: false, Message: "Please encode only one feedback"})
    }

    feed.good = good
    feed.bad = bad
    feed.neutral = neutral
    feed.Total = feed.good + feed.bad + feed.neutral
    feed.Average = ((good - bad)/(good + bad + neutral))
    feed.save(err => {
        if(err) return res.json({ Success: false, Error: err})
        return res.json({ Success: true })
    }) 
})

//delete
router.delete("/:id", async (req, res) => {
    await Feed.findByIdAndRemove(req.params.id)
        res.status(204).end()
})

//app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//to use api
app.use("/api", router)

module.exports = app