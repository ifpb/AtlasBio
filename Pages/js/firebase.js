var database = firebase.database();

// LOGIN DEFAULT

document.getElementById("formlogin") != null ? (
    document.getElementById("formlogin").addEventListener("submit", () => {
        event.preventDefault();
        var email = document.getElementById("loginemail");
        var password = document.getElementById("loginpassword");
        Firebase_Login(email,password);
    })
) : false;

function Firebase_Login(userEmail,userPass){
    userEmail = userEmail.value;
    userPass = userPass.value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        if(errorMessage == "The password is invalid or the user does not have a password."){
            window.alert("Senha inválida ou usuário não cadastrado.")
        }
        else if(errorMessage == "The email address is badly formatted."){
            window.alert("O endereço de email está mal formatado ou não foi preenchido.")
        }
    });
}

// $LOGIN DEFAULT

// LOGOUT

function Firebase_Logout(){
    firebase.auth().signOut();  
}

// $LOGOUT

// REGISTER

    function SelectChecked(father,kids){
        return Array.from(father.querySelectorAll(kids)).filter(item => {
            if(item.selected == true){
                return item 
            }
        })[0];
    }

    document.getElementById("Form_Register") != null ? (
        document.getElementById("Form_Register").addEventListener("submit", () => {
            event.preventDefault();
            let email = document.getElementById("email");
            let name = document.getElementById("name").value;
            let password = document.getElementById("password");
            let confirm = document.getElementById("confirm");
            let voce = SelectChecked(document.getElementById("voce"),"option").value;
            let day = SelectChecked(document.getElementById("day"),"option").textContent;
            let month = SelectChecked(document.getElementById("month"),"option").textContent;
            let year = SelectChecked(document.getElementById("year"),"option").textContent;
            let date = `${day}/${month}/${year}`;
            voce != "you" ? (
                password.value == confirm.value ?
                Firebase_RegisterEmail(email,password,[name,date,voce]) :
                alert('As senhas não conferem')
            ) :
            alert("Selecione sua profissão");
        })
    ) : false;

    function Firebase_RegisterEmail(email,password,data){
        var email = email.value;
        var password = password.value;
        if(email != "" && password != ""){
            var errorcont = 0;
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                errorcont ++;
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                errorMessage == "The email address is already in use by another account." ?
                    alert('O endereço de email já está sendo usado por outra conta.') : false;
            });
            errorcont == 0 && data.length > 0 ? Firebase_RegisterDatabase(email,password,data) : false;
        }
    }
  
    function Firebase_RegisterDatabase(email,password,data){
        firebase.auth().signInWithEmailAndPassword(email, password);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var user = firebase.auth().currentUser;
                firebase.database().ref('users/' + user.uid).set({
                    nome: data[0],
                    data: data[1],
                    profissao: data[2]
                });        
                Firebase_Logout();
            }
        });
    }
  
// $REGISTER

// REGISTER ALTERNATIVE

function Firebase_AlternativeLogin(type,data){
    if(type == "Google" || type == "google"){
        var provider = new firebase.auth.GoogleAuthProvider();
    }
    console.log("entrou");
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

// $REGISTER ALTERNATIVE


// SIGNED

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // alert("entrou");
    } else{
        // alert("saiu");
    }
});

// $SIGNED