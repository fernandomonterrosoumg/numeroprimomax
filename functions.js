var api = "datos.php?FUNC=";
var n = 2;
var stopMax = 0;//300;
var primeArray = [2];
var primePaint;
var totalSum=0;
var user="";
var wrap = document.getElementById('wrapper')

document.addEventListener("DOMContentLoaded", function(event) {
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    user = params.get("user");
    console.log(user);
    if(user==null || user==""){
        window.location.href = "login.html";
    }else{
        getHistorial(user);
    };
});

function primer2(num) {
    var numSqr = Math.sqrt(num);
    for (var i = 0, len = primeArray.length; i < len; i++) {
        if (num % primeArray[i] === 0) { 
            return false;
        }
        if (primeArray[i] > numSqr)
        { 
            return true;
        }
    }
    return true;
}

function getprime(x) {
    if (primer2(x, primeArray)) {

        if(x>stopMax){

            for (var i = 0, len = primeArray.length; i < len; i++) {
                totalSum= totalSum+primeArray[i];
            }
            
            comprobarHisto(user,stopMax,totalSum);
            alert("La sumatorio de los numeros primos es: "+totalSum);
            return window.clearInterval(primePaint); 
        };

        primeArray.push(x);

        var lDigit = x.toString();
        lDigit = lDigit.slice(-1)
        console.log(lDigit,x,primeArray);
        var p = document.createElement('div')

        switch (lDigit) {
            case "1":
                p.style.backgroundColor = "rgba(3,112,101,1)";
                break;
            case "3":
                p.style.backgroundColor = "rgba(36,207,247,1)";
                break;
            case "7":
                p.style.backgroundColor = "#f00";
                break;
            case "9":
                p.style.backgroundColor = "#00f";
                break;

        }


        p.innerHTML = x;
        before = document.querySelector('#wrapper div')
        wrap.insertBefore(p, before)

    }
}

function goPrime() {
    primePaint = setInterval(
                        function () {
                            getprime(n); 
                            n++; 
                        }, 100
                    )
                        console.log(primePaint);
}

document.getElementById('start').addEventListener('click',
    function () {
        var valueIni = document.getElementById("number").value;
        if(valueIni=="" || valueIni<=2){
            return alert("Numero no permitido");
        };
        document.getElementById('start').style.display = 'none';  
        stopMax = valueIni;
        goPrime(); 
    }
,false);

document.getElementById('new').addEventListener('click',
    function () {
        location.reload();
    }
,false);


document.getElementById('exit').addEventListener('click',
    function () {
        window.location.href = "login.html";
    }
,false);



function getHistorial(user) {
    let hostial =[];
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(api + "getHistorial", requestOptions)
        .then(resp =>
            resp.json()
        ).then(result => {
            if (result.data) {
                hostial = result.data.filter(x => x.user === user);
                
                var root = document.getElementById('tableHi');
                root.remove();

                document.getElementById('divHisto').innerHTML += `<h4>Hostorial del usaurio</h4>
                <table id="tableHi">
                    <thead>
                      <tr>
                        <td>
                          <b>Numero</b>
                        </td>
                        <td>
                          <b>Suma de los numeros primos</b>
                        </td>
                        <td>
                            <b>Fecha</b>
                        </td>
                      </tr>
                    </thead>
                    <tr id="root"></tr>
                  </table>`;

                var root = document.getElementById('root');
                //root.remove();

                
                

                hostial.forEach(element => root.insertAdjacentHTML('afterend', `<tr><td>${element.numero}</td><td>${element.total}</td><td>${element.fecha}</td></tr>`));
                
            } else if (result.error) {
                alert(result.error);
            } else {
                alert("api no contesta lo que se espera");
            }
        })
        .catch(error => alert('error' + error));

        
}


function comprobarHisto(user,stopMax,totalSum) {
    let hostial =[];
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(api + "getHistorial", requestOptions)
        .then(resp =>
            resp.json()
        ).then(result => {
            if (result.data) {
                hostial = result.data.filter(x => x.user === user);
                result.data.push({user:user,numero:stopMax,total:totalSum,fecha:new Date().toLocaleDateString('en-GB')});
                createHisto(result);
            } else if (result.error) {
                alert(result.error);
            } else {
                alert("api no contesta lo que se espera");
            }
        })
        .catch(error => alert('error' + error));

        
}


function createHisto(hostial) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(hostial),
        redirect: 'follow'
    };

    fetch(api + "createHistorial", requestOptions)
        .then(resp =>
            resp.json()
        ).then(result => {
            if (result.data) {
                alert(result.data);
                getHistorial(user)
            } else if (result.error) {
                alert(result.error);
            } else {
                alert("api no contesta lo que se espera");
            }
        })
        .catch(error => alert('error' + error));

}