
var fs = require('fs');
var dedupe = require('./dedupe');
var RandomEmailGenerator = require('./randomEmailGenerator');



var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');

var hl = require("highlight").Highlight;

var app = express();

app.set('port', (process.env.PORT || 5000));

// enables handlebars templates
app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials('./views/partials');


app.use(express.static('public'));
app.use(bodyParser.json({limit: '2mb'}));



app.get('/', function (req, res) {
    console.log('home page load');
    var dedupeModule = fs.readFileSync('./dedupe.js',"utf-8");
    var html = hl(dedupeModule);

    res.render('layout', {
        dedupe_code : html
    });
});

app.post('/api/dedupe', function (req, res) {
    console.log('Request to dedupe emails', req.body.emails);
    
    var dedupingFunction = (req.body.function === 'array') ? dedupe.arrayDedupe : dedupe.mapDedupe;

    var now = Date.now(); 
    var deduped = dedupingFunction(req.body.emails);
    var then = Date.now(); 

    console.log('Deduped time: ', then - now);

    res.json({
        emails: req.body.emails,
        deduped: deduped,
        functionUsed : req.body.function = 'array' ? 'array' : 'map',
        timeToDedupe: then - now
    });
});

app.get('/api/generate', function (req, res) {
    console.log('generate emails');
    var count = req.query.count || 1000; 
    var emails = RandomEmailGenerator.generateWithDupes(count);
    res.json({
        emails: emails
    });
});

app.listen(app.get('port'), function() {
  console.log('Email Deduplicator UI is running on port', app.get('port'));
});