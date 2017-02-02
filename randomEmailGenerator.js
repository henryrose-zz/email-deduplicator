var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','+','_']; 
var tlds = ['com', 'net','org','gov','io','ws','ch','ai','uk'];

function generateList(count){
    var emails = []; 
    for (var i = 0; i < count; i++){
        emails.push(generateEmail());
    }
    return emails; 
}

function generateListWithDupes(count){
    var emails = []; 

    for (var i = 0; i < count/2; i++){
        emails.push(generateEmail());
    }

    for (var j = 0; j < count/2; j++){
        emails.splice(getRandInt(emails.length), 0, emails[getRandInt(emails.length)]);
    }

    return emails; 
}

function generateEmail(){
    var name ='';
    var domain = '';
    var tld;

    for (var i = 0; i < getRandInt(15); i++){
        name += alphabet[getRandInt(alphabet.length)];
    }

    for (var j = 0; j < getRandInt(15); j++){
        domain += alphabet[getRandInt(alphabet.length)];
    }

    tld = tlds[getRandInt(tlds.length)];

    return name + '@' + domain + '.' + tld;
}

function getRandInt(max){
    return Math.floor(Math.random() * max);
}

module.exports = {
    generate : generateList,
    generateWithDupes: generateListWithDupes
}; 