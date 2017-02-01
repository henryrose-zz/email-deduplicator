
/**
 * This module contains a function to dedupe 
 * an array of email addresses
 */

// This was my first attempt, it was slow!
function arrayDedupe(emails){
  var email; 
  var deduped = []; // store deduped emails
  
  // iterate through list of emails
  for (var i = 0; i < emails.length; i++){
    email = emails[i]; 
    
    // check for the presence of this email in our 
    // deduplicated array
    if (deduped.indexOf(email) < 0){      
        deduped.push(email);
    }
  }
  return deduped;  
};

// This is much faster
function mapDedupe(emails){
  var email; 
  var deduped = {};  // store deduped emails
  var out = []; 

  for (var i = 0; i < emails.length; i++){
    email = emails[i];
    if (typeof(deduped[email] === 'undefined')){
      deduped[email] = 1; 
    }
  }
  return Object.keys(deduped); 
}

module.exports = {
  arrayDedupe : arrayDedupe,
  mapDedupe: mapDedupe
}