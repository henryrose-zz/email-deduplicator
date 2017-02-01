/**
 * Some simple tests of the deduping module. For a production app we might use
 * a test framework such as Mocha for this. 
 */

// Includes
var dedupe = require('./dedupe');
var RandomEmailGenerator = require('./randomEmailGenerator');

// Test that dupes are removed
var testEmails1 = ['cat@bear.com', 'apple@pear.com', 'sandwich@paseo.com', 'pickle@brine.com', 'apple@pear.com', 'sandwich@paseo.com'];
var expectedOutput1 = ['cat@bear.com', 'apple@pear.com', 'sandwich@paseo.com', 'pickle@brine.com'];

var deduped1 = dedupe.mapDedupe(testEmails1);

var success =   deduped1[0] === expectedOutput1[0] && 
                deduped1[1] === expectedOutput1[1] &&
                deduped1[2] === expectedOutput1[2] &&
                deduped1[3] === expectedOutput1[3];

console.log('Duplicate emails were removed:', success);


// Test that 100000 emails can be deduped in < 1000ms
var emails = RandomEmailGenerator.generateWithDupes(100000); 

var now = Date.now(); 
var deduped = dedupe.mapDedupe(emails);
var timeElapsed = Date.now() - now; 

var success = timeElapsed < 1000; 

console.log('Deduping occurs in less than 1000ms: ', success);
console.log('Deduping 100000 emails took ' + timeElapsed + 'ms');