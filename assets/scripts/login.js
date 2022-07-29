//LOGIN


function logar() {
    let email = document.getElementById('loginemail').value;
    let password = document.getElementById('loginpassword').value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
        toggleButtonCorrect(0);
        setTimeout(() => {
            load('home');
        }, 1000);
    }).catch((err => {
        toggleButtonError(0);
        setTimeout(() => {
            let errCode = err.code;
            let errMsg = err.message;
            ErrorCode(errCode, errMsg, 'Red');
        }, 300);
        setTimeout(() => {
            let inputEmail = document.getElementById('loginemail');
            inputEmail.focus();
        }, 3000);
    }));
}

// CADASTRO

function cadastro() {
    let email = document.getElementById('siginemail').value;
    let password = document.getElementById('siginpassword').value;
    toggleButtonCorrect(0);
    if (confereCadastro() == true) {
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            let nome = document.getElementById('nomeuser').value.toUpperCase().trim();
            let sobrenome = document.getElementById('sobrenomeuser').value.toUpperCase().trim();
            let sexo = document.querySelector('input[name="sexo"]:checked').value;
            let nasc = document.getElementById('datanasc').value;
            toggleButtonCorrect(0);
            if (nasc.length != 10) {
                toggleButtonError(0)
                setTimeout(() => {
                    ErrorCode('Data de nascimento', 'Incorreta', 'Red');
                }, 300);
                setTimeout(() => {
                    deleteUser();
                    let inputEmail = document.getElementById('siginemail');
                    inputEmail.focus();
                }, 3000);
            } else {
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
                            toggleButtonCorrect(0);
                            setTimeout(() => {
                                load('home');
                            }, 3000);
                        }).catch((err) => {
                            toggleButtonError(0);
                            deleteUser();
                            ErrorCode('Não foi possivel inserir os dados', err, 'Red');
                        })
                    } else {
                        ErrorCode('Erro', 'Desconhecido', 'Red');
                    }
                });
            }
        }).catch((err) => {
            toggleButtonError(0);
            setTimeout(() => {
                ErrorCode(err.code, err.message, 'Red');
                try {
                    deleteUser();
                } catch (error) {
                    console.log(error);
                }
            }, 300);
            setTimeout(() => {
                let inputEmail = document.getElementById('siginemail');
                inputEmail.focus();
            }, 3000);
        })
    } else {
        toggleButtonError(0);
        setTimeout(() => {
            ErrorCode('Email/Senha ou Preencha todos os dados', 'Não conside', 'Red');
        }, 200);
        setTimeout(() => {
            let email1 = document.getElementById('siginemail');
            email1.focus();
        }, 3000);

    }
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
function deleteUser() {
    auth.currentUser.delete().then(() => {
        ErrorCode('Tente se cadastrar novamente', '...', 'Red');
    }).catch((err) => {
        ErrorCode('Erro', err, 'Red');
    })
}
function togglePassword(number) {
    let passwordLogin = document.getElementById('loginpassword');
    let passwordCadas = document.getElementById('siginpassword');
    let passwordConfCadas = document.getElementById('confsiginpassword');
    if (number == '1') {
        let type = passwordLogin.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordLogin.setAttribute('type', type);
    }
    if (number == '2') {
        let type = passwordCadas.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordCadas.setAttribute('type', type);
    }
    if (number == '3') {
        let type = passwordConfCadas.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordConfCadas.setAttribute('type', type);
    }
}
function toggleButtonCorrect(i) {
    let incorrectX = document.querySelectorAll('.incorrect')[i];
    let buttonLogin = document.querySelectorAll('.button')[i];
    let correctImg = document.querySelectorAll('.correct')[i];
    incorrectX.style.display = 'none';
    incorrectX.style.opacity = '0';
    buttonLogin.style.backgroundColor = '#44c98a';
    correctImg.style.display = 'inline';
    correctImg.style.opacity = '1';
    setTimeout(() => {
        buttonLogin.style.backgroundColor = '#282231';
        correctImg.style.display = 'none';
        correctImg.style.opacity = '0';
    }, 3000);
}
function toggleButtonError(i) {
    let incorrectX = document.querySelectorAll('.incorrect')[i];
    let buttonLogin = document.querySelectorAll('.button')[i];
    let correctImg = document.querySelectorAll('.correct')[i];
    correctImg.style.opacity = '0';
    correctImg.style.display = 'none';
    buttonLogin.style.backgroundColor = 'red';
    incorrectX.style.display = 'inline';
    incorrectX.style.opacity = '1';
    setTimeout(() => {
        buttonLogin.style.backgroundColor = '#282231';
        incorrectX.style.display = 'none';
        incorrectX.style.opacity = '0';
    }, 3000);
}
function ErrorCode(errCode, errMsg, errCor) {
    let errorMessageHTML = document.getElementById('erro');
    if (errCor == 'Red') {
        errorMessageHTML.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'
    } else {
        errorMessageHTML.style.backgroundColor = 'rgba(118, 248, 106, 0.8)';
    }
    errorMessageHTML.style.display = 'flex';
    errorMessageHTML.innerHTML =
        `<h1 id="errorCode">${errCode}</h1>
            <p id="errorMessage">${errMsg}</p>`;
    setTimeout(() => {
        errorMessageHTML.style.display = 'none';
        errorMessageHTML.innerHTML = '';
    }, 3000);
}