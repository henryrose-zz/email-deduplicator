/**
 * This module contains a function to dedupe an array of email addresses
 */

// This was my first attempt, it was slow!
function arrayDedupe(emails){
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
  return deduped;  
};

// This is much faster
function mapDedupe(emails){
  var email; 
  var obj = {}; 
  var out = []; 

  for (var i = 0; i < emails.length; i++){
    email = emails[i];
    if (typeof(obj[email] === 'undefined')){
      obj[email] = 1; 
    }
  }
  return Object.keys(obj); 
}

module.exports = {
  arrayDedupe : arrayDedupe,
  mapDedupe: mapDedupe
}