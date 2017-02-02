/**
 * Client side javascript for the email deduplicator UI
 */
(function(){

    // Render the results of a call to the deduping service
    function renderResults(results){
        document.getElementById('results').classList.remove('hide');
        document.getElementById('deduped-emails').value = results.deduped; 
        document.getElementById('time-to-dedupe').innerHTML = results.timeToDedupe;
        document.getElementById('removed').innerHTML = results.removed; 
    }

    // disable various buttons in the ui, useful while longrunning async calls are in flight
    function toggleUI(disable){
        var dedupeTextarea = document.getElementById('dedupe-textarea');
        var generateEmailsButton = document.getElementById('generate-random');
        var submitButton = document.getElementById('submit');

        dedupeTextarea.disabled = disable; 
        generateEmailsButton.disabled = disable; 
        submitButton.disabled = disable;
    }

    function disableUI(){
        toggleUI(true);
    }
    
    function enableUI(){
        toggleUI(false);
    }

    // Handle submission of deduping form
    function handleFormSubmit(e){
        e.preventDefault(); 
        var textarea = document.getElementById('dedupe-textarea');
        var dedupingFunction = document.querySelector('input[name = "function"]:checked').value;

        disableUI();

        var emails = textarea.value.split(',');
        var jsonEmails = JSON.stringify({
                emails : emails,
                function: dedupingFunction
            });

        var http = new XMLHttpRequest();
        var url = "/api/dedupe";
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/json");

        http.onreadystatechange = function() {//Call a function when the state changes.
            var results; 
            if(http.readyState == 4 && http.status == 200) {
                results = JSON.parse(http.responseText);
                results.removed = results.emails.length - results.deduped.length;
                renderResults(results);
                enableUI();
            }
        };
        http.send(jsonEmails);
    }

    // Handle click on generate emails button
    function handleGenerateClick(){
        var count = document.getElementById('count').value;
        var dedupeTextarea = document.getElementById('dedupe-textarea');
        var http = new XMLHttpRequest();
        var url = "/api/generate?count=" + count;


        if(count > 125000){
            alert("this is going to be really slow!");
        }

        disableUI();

        http.open("GET", url, true);

        http.onreadystatechange = function() {
            var results; 
            if(http.readyState == 4 && http.status == 200) {                
                var result = JSON.parse(http.responseText);
                dedupeTextarea.value = result.emails.join(',');
                dedupeTextarea.disabled = false; 
                enableUI();
            }
        };
        http.send();
    }

    
    // setup client side app on page load
    window.onload = function(){
        var form = document.getElementById('dedupe-form');
        form.onsubmit = handleFormSubmit; 

        var generateButton = document.getElementById('generate-random');
        generateButton.onclick = handleGenerateClick; 
    };

    
}());