/**
 * This module contains a function to dedupe an array of email addresses
 */

module.exports = function(emails, callback){
  var deduped = []; // place to put our deduped emails
  var err; 
  var email; 

  // iterate through list of emails
  for (var i = 0; i < emails.length; i++){
    email = emails[i]; 

    // check for the presence of this email in our deduplicated array
    if (deduped.indexOf(email) < 0){
        deduped.push(email);
    }
  }
  callback(err, deduped) 
};