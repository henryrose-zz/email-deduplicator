
var dedupe = require('./dedupe');

var RandomEmailGenerator = require('./randomEmailGenerator');

/**
var now = Date.now(); 
var emails = RandomEmailGenerator.generateWithDupes(100000); 
console.log('generating took ' + (Date.now() - now) + 'ms'); 
console.log('dedupe these ' + emails.length + ' emails'); 


console.log('lets use an array first:')
now = Date.now(); 
var deduped = dedupe.arrayDedupe(emails);
console.log('Deduped email count: ', deduped.length);
console.log('Deuping took ' + (Date.now() - now) + 'ms');


console.log('ok lets try using a javascript Object or map');
now = Date.now(); 
var deduped = dedupe.mapDedupe(emails);
var endTime = Date.now(); 
console.log('Deduped email count: ', deduped.length);
console.log('Deuping took ' + (Date.now() - now) + 'ms');
**/

var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser')

var app = express()

// enables handlebars templates
app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials('./views/partials');


app.use(express.static('public'))
app.use(bodyParser.json({limit: '2mb'}));



app.get('/', function (req, res) {
    console.log('home page load')
    res.render('layout')
})

app.post('/api/dedupe', function (req, res) {
    console.log('Request to dedupe emails', req.body.emails);
    var now = Date.now(); 
    var deduped = dedupe.mapDedupe(req.body.emails);
    var then = Date.now(); 

    console.log('Deduped time: ', then - now);

    res.json({
        emails: req.body.emails,
        deduped: deduped,
        timeToDedupe: then - now
    })
})

app.get('/api/generate', function (req, res) {
    console.log('generate emails')
    var count = req.query.count || 1000; 
    var emails = RandomEmailGenerator.generateWithDupes(count);
    res.json({
        emails: emails
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})