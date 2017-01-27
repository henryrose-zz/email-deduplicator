var dedupe = require('./dedupe');
var RandomEmailGenerator = require('./randomEmailGenerator');

//var emails = ['cat@hat.com', 'dog@bog.net', 'bill@sill.ws', 'cat@hat.dog', 'al@pal.org']; 
var now = Date.now(); 
var emails = RandomEmailGenerator.generateWithDupes(50000); 
console.log('generating took ' + (Date.now() - now) + 'ms'); 
console.log('dedupe these ' + emails.length + ' emails'); 

 
var startTime = Date.now();
dedupe(emails, function (err, deduped) {
    
    var endTime = Date.now(); 
    console.log('Deduped email count: ', deduped.length);
    console.log('Deuping took ' + (endTime-startTime) + 'ms');
})



