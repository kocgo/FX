const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const jsonData = require("./jsonData");

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile("./index.html")
})

app.get('/test', (req,res) => {
    res.sendFile(__dirname + "/public/testUI/testResults.html")
})

// STEP 1
app.get('/allPairs', (req,res) => {
    res.json(jsonData)
})

// STEP 2
app.post('/specificPairs/', (req,res) => {
    try {
        let result = jsonData.filter(f => {
            return req.body.some(e => {
                return e == f["pair"]
            })
        }) || ""
        // STEP 3
        res.json(result)
    }

    catch (error){
        res.send(error)
    }
})

// STEP 4
app.post('/specificPairsWithRandom/', (req,res) => {

    let copyJson = [...jsonData]
    let result = [...copyJson].filter(f => {
        return req.body.some(e => {
            return e == f["pair"]
        })
    }) || ""
    
// STEP 5
    let resultRandomize = [...result].map( r => {
        return {
            ...r,
            buy : r["buy"] + (r["buy"] * (parseFloat(-0.1) + (Math.random() * 0.2))),
            sell : r["sell"] + (r["sell"] * (parseFloat(-0.1) + (Math.random() * 0.2)))
        }
    })

    res.json(resultRandomize)
})

// ERROR HANDLE
app.use( (err, req, res, next) => {
    if (err) {
        res.status(500).send(`Error Occured: ${err}`)
    } else {
    res.status(404).send('<h1>Page Not Found :(</h1>')
    }
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})


module.exports = app
