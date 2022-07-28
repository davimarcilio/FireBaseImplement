//LOGIN


function logar() {
    let email = document.getElementById('loginemail').value;
    let password = document.getElementById('loginpassword').value;
    let buttonLogin = document.querySelectorAll('.button')[0];
    buttonLogin.style.backgroundColor = '#44c08a'
    auth.signInWithEmailAndPassword(email, password).then(() => {
        let correctImg = document.querySelectorAll('.correct')[0];
        buttonLogin.style.backgroundColor = '#44c08a'
        correctImg.style.display = 'inline';
        correctImg.style.opacity = '1';
        setTimeout(() => {
            load('home');
        }, 1000);
    }).catch((err => {
        //botão
        let incorrectX = document.querySelectorAll('.incorrect')[0];
        buttonLogin.style.backgroundColor = 'red';
        incorrectX.style.display = 'inline'
        incorrectX.style.opacity = '1'
        // error message
        setTimeout(() => {
            let errCode = err.code;
            let errMsg = err.message;
            ErrorCode(errCode, errMsg);
        }, 400);
        setTimeout(() => {
            let inputEmail = document.getElementById('loginemail');
            inputEmail.focus();
            buttonLogin.style.backgroundColor = '#282231';
            incorrectX.style.display = 'none';
            incorrectX.style.opacity = '0';
            ResetErrorCode();
        }, 3000);
    }));
}


function ResetErrorCode() {
    let errorMessageHTML = document.getElementById('erro');
    errorMessageHTML.style.display = 'none';
    errorMessageHTML.innerHTML = '';
}

function ErrorCode(errCode, errMsg) {
    let errorMessageHTML = document.getElementById('erro');
    errorMessageHTML.style.display = 'flex';
    errorMessageHTML.innerHTML = `
            <h1 id="errorCode">${errCode}</h1>
            <p id="errorMessage">${errMsg}</p>`;
}

// CADASTRO

function cadastro() {
    let emailcorrect = false;
    emailcorrect = confereCadastro();
    let buttonLogin = document.querySelectorAll('.button')[0];
    let correctImg = document.querySelectorAll('.correct')[0];
    let email = document.getElementById('siginemail').value;
    let password = document.getElementById('siginpassword').value;
    if (emailcorrect == true) {
        setTimeout(() => {
            correctImg.style.display = 'inline'
            correctImg.style.opacity = '1';
            buttonLogin.style.backgroundColor = '#44c98a';
            auth.createUserWithEmailAndPassword(email, password).then(() => {
                let nome = document.getElementById('nomeuser').value.toUpperCase().trim();
                let sobrenome = document.getElementById('sobrenomeuser').value.toUpperCase().trim();
                let sexo = document.querySelector('input[name="sexo"]:checked').value;
                let nasc = document.getElementById('datanasc').value;
                firebase.auth().onAuthStateChanged((user) => {
                    var uiduser = user.uid;
                    if (user) {
                        db.collection('Usuários').add({
                            uid_user: uiduser,
                            email: email,
                            nome: nome,
                            sobrenome: sobrenome,
                            sexo: sexo,
                            nascimento: nasc,
                        }).then(() => {
                            setTimeout(() => {
                                load('home');
                            }, 1000);
                        }).catch((err) => {
                            deleteUser();
                            ErrorCode('Não foi possivel inserir os dados', '...');
                            console.log(err);
                        })
                    } else {
                        console.log('error');
                    }
                });
            }).catch((err) => {
                //botão
                correctImg.style.display = 'none';
                correctImg.style.opacity = '0';
                let incorrectX = document.querySelectorAll('.incorrect')[0];
                buttonLogin.style.backgroundColor = 'red';
                incorrectX.style.display = 'inline';
                incorrectX.style.opacity = '1';
                // error message
                setTimeout(() => {
                    let errCode = err.code;
                    let errMsg = err.message;
                    ErrorCode(errCode, errMsg);
                    try {
                        deleteUser();
                    } catch (error) {
                        console.log(error);
                    }
                }, 400);
                setTimeout(() => {
                    let inputEmail = document.getElementById('siginemail');
                    inputEmail.focus();
                    buttonLogin.style.backgroundColor = '#282231';
                    incorrectX.style.opacity = '0';
                    incorrectX.style.display = 'none';
                    ResetErrorCode();
                }, 3000);
            })
        }, 200);

    } else {
        setTimeout(() => {
            correctImg.style.opacity = '0';
            correctImg.style.display = 'none';
            buttonLogin.style.backgroundColor = 'red';
            let incorrectX = document.querySelectorAll('.incorrect')[0];
            setTimeout(() => {
                incorrectX.style.opacity = '1';
                incorrectX.style.display = 'inline';
                ErrorCode('Email/Senha ou Preencha todos os dados', 'Não conside');
            }, 200);
            setTimeout(() => {
                correctImg.style.opacity = '0';
                correctImg.style.display = 'none';
                let email1 = document.getElementById('siginemail');
                email1.focus();
                buttonLogin.style.backgroundColor = '#282231';
                incorrectX.style.opacity = '0';
                incorrectX.style.display = 'none';
                ResetErrorCode();
            }, 2000);
        }, 200);

    }


}
function logOut() {
    auth.signOut().then(() => {
        console.log('deslogado');
    }).catch((err) => {
        console.log(err);
    });
}
function confereCadastro() {
    let campos = [document.getElementById('siginemail').value,
    document.getElementById('confcreateemail').value,
    document.getElementById('siginpassword').value,
    document.getElementById('confsiginpassword').value,
    document.getElementById('nomeuser').value.toUpperCase().trim(),
    document.getElementById('sobrenomeuser').value.toUpperCase().trim(),
    document.querySelector('input[name="sexo"]:checked').value,
    document.getElementById('datanasc').value,
    ];
    if (campos[0] == campos[1] && campos[2] == campos[3]) {
        return campos.every((campo) => {
            return campo != '';
        })
    } else { return false; }

};
// logOut();
function deleteUser() {
    auth.currentUser.delete().then(() => {
        console.log('tente cadastrar-se novamente')
    }).catch((err) => {
        console.log(err);
        console.log('deu algo de errado');
    })
}
