var dedupe = require('./dedupe');
var RandomEmailGenerator = require('./randomEmailGenerator');

//var emails = ['cat@hat.com', 'dog@bog.net', 'bill@sill.ws', 'cat@hat.dog', 'al@pal.org']; 
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




