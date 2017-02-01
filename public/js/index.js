(function(){
    function renderResults(results){
        document.getElementById('results').classList.remove('hide');
        document.getElementById('deduped-emails').value = results.deduped; 
        document.getElementById('time-to-dedupe').innerHTML = results.timeToDedupe;
        document.getElementById('removed').innerHTML = results.removed; 
    }

    function handleFormSubmit(e){
        e.preventDefault(); 
        var textarea = document.getElementById('dedupe-textarea');
        var dedupingFunction = document.querySelector('input[name = "function"]:checked').value;

        var emails = textarea.value.split(',')
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
            }
        }
        http.send(jsonEmails);
    }

    function handleGenerateClick(){
        var count = document.getElementById('count').value;
        var dedupeTextarea = document.getElementById('dedupe-textarea');
        var http = new XMLHttpRequest();
        var url = "/api/generate?count=" + count;


        if(count > 125000){
            alert("this is going to be really slow!");
        }

        dedupeTextarea.disabled = true; 

        http.open("GET", url, true);

        http.onreadystatechange = function() {//Call a function when the state changes.
            var results; 
            if(http.readyState == 4 && http.status == 200) {
                
                var result = JSON.parse(http.responseText);
                dedupeTextarea.value = result.emails.join(',');
                dedupeTextarea.disabled = false; 
            }
        }
        http.send();
    }

    
    
    window.onload = function(){
        var form = document.getElementById('dedupe-form');
        form.onsubmit = handleFormSubmit; 

        var generateButton = document.getElementById('generate-random');
        generateButton.onclick = handleGenerateClick; 
    };

    
}());