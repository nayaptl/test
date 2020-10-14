

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


//gia ta url
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(3000, function () {
    console.log('listening on 3000')//port
})
//ayto poy exoume grapsei sto html arxeio tha emfanistei sto localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})




//to url to pairnoume apo mongodb compass gui
MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', (err, client) => {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)//errorhandlingmessage
        console.log('Connected to Database')

        const db = client.db('stardb')//dhmioyrgia db
        const quotesCollection = db.collection('quotes')
        app.post('/quotes', (req, res) => {
            //dhmiourgoyme to collection
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')//xana gyrnaei gia na valoume allo item
                })
                .catch(error => console.error(error))
            //vazoyme item
        })
})
