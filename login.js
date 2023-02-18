var api = "datos.php?FUNC=";


    document.getElementById('loginBtn').addEventListener('click',
        function () {
            getUser();
        }
        , false);

        document.getElementById('register').addEventListener('click',
        function () {
            comprobateUser(document.getElementById("userRegister").value);
        }
        , false);
        


function getUser() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(api + "getUsers", requestOptions)
        .then(resp =>
            resp.json()
        ).then(result => {
            if (result.data) {
                var user = document.getElementById("user").value;
                if (result.data.filter(x => x.user === user).length > 0) {
                    window.location.href = "index.html?user=" + user;
                } else {
                    alert("usuario no existe registrelo");
                };

            } else if (result.error) {
                alert(result.error);
            } else {
                alert("api no contesta lo que se espera");
            }
        })
        .catch(error => alert('error' + error));

}


function comprobateUser(user) {
    if(user==null || user==""){
        return alert("Debe ingresar un usuario");
    }

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(api + "getUsers", requestOptions)
        .then(resp =>
            resp.json()
        ).then(result => {
            if (result.data) {
                
                if (result.data.filter(x => x.user === user).length > 0) {
                    alert("usuario ya existe");
                } else {
                    result.data.push({"user":user});
                    createUser(result);
                };

            } else if (result.error) {
                alert(result.error);
            } else {
                alert("api no contesta lo que se espera");
            }
        })
        .catch(error => alert('error' + error));

}

function createUser(jsonUsers) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(jsonUsers),
        redirect: 'follow'
    };

    fetch(api + "createUser", requestOptions)
        .then(resp =>
            resp.json()
        ).then(result => {
            if (result.data) {
                alert(result.data);
            } else if (result.error) {
                alert(result.error);
            } else {
                alert("api no contesta lo que se espera");
            }
        })
        .catch(error => alert('error' + error));

}