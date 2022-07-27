//LOGIN


function logar() {
    let email = document.getElementById('loginemail').value;
    let password = document.getElementById('loginpassword').value;
  let buttonLogin = document.querySelectorAll('.button')[0];
  buttonLogin.style.backgroundColor = '#44c08a'
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            let correctImg = document.querySelectorAll('.correct')[0];
            buttonLogin.style.backgroundColor = '#44c08a'
            correctImg.style.opacity = '1';
            setTimeout(()=>{
                load('home');
            }, 1000);
        }).catch((err=>{
            //botão
            let incorrectX = document.querySelectorAll('.incorrect')[0];
            buttonLogin.style.backgroundColor = 'red';
            incorrectX.style.opacity = '1'
            // error message
            let errorMessageHTML = document.getElementById('erro');
            setTimeout(() => {  
            errorMessageHTML.style.display = 'flex'
            let errCode = err.code;
            let errMsg = err.message;
            errorMessageHTML.innerHTML = `
            <h1 id="errorCode">${errCode}</h1>
            <p id="errorMessage">${errMsg}</p>`;
            }, 400);
            setTimeout(() => {
                let inputEmail = document.getElementById('loginemail');
                inputEmail.focus();
                buttonLogin.style.backgroundColor = '#282231';
                incorrectX.style.opacity = '0';
                errorMessageHTML.style.display = 'none';
                errorMessageHTML.innerHTML = '';
            }, 3000);
        }));
    }


// CADASTRO

function cadastro() {
    let emailcorrect = false;
    emailcorrect = confereCadastro();
    let buttonLogin = document.querySelectorAll('.button')[1];

    let email = document.getElementById('siginemail').value;
    let password = document.getElementById('siginpassword').value;
    if (emailcorrect == true) {
        setTimeout(() => {
            let correctImg = document.querySelectorAll('.correct')[1];
            correctImg.style.opacity = '1';
        }, 200);
        buttonLogin.style.backgroundColor = '#44c98a';
        auth.createUserWithEmailAndPassword(email, password).then(()=>{
          let nome = document.getElementById('nomeuser').value;
          let sobrenome = document.getElementById('sobrenomeuser').value;
          let sexo = document.querySelector('input[name="sexo"]:checked').value;
          let nasc = document.getElementById('datanasc').value;
          db.collection('Usuários').add({
            email: email,
            nome: nome,
            sobrenome: sobrenome,
            sexo: sexo,
            nascimento: nasc,
          })
        })
    } else {
        buttonLogin.style.backgroundColor = 'red';
        let erroremail = document.getElementById('erroremail');
        let incorrectX = document.querySelectorAll('.incorrect')[1];
        setTimeout(() => {
            incorrectX.style.opacity = '1'
        }, 200);
        erroremail.style.display = 'flex';
        erroremail.innerHTML = `<h5>Email/Senha não são iguais</h5>`;
        setTimeout(() => {
            erroremail.style.display = 'none';
            let email1 = document.getElementById('siginemail');
            email1.focus();
            buttonLogin.style.backgroundColor = '#282231';
            incorrectX.style.opacity = '0';
            erroremail.innerHTML = '';
        }, 2000);
    }
      
     
}
function logOut() {
    auth.signOut().then(()=>{
        console.log('deslogado');
    }).catch((err)=>{
        console.log(err);
    });
}
function confereCadastro() {
    let email1 = document.getElementById('siginemail').value;
    // let email2 = document.getElementById('confcreateemail').value;
    let password1 = document.getElementById('siginpassword').value;
    // let password2 = document.getElementById('confsiginpassword').value;
    if (email1 != '' && password1 != '') {
        return true;
    } else {
    return false
}
};