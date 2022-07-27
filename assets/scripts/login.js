function logar() {
    let email = document.getElementById('loginemail').value;
    let password = document.getElementById('loginpassword').value;
  let buttonLogin = document.querySelectorAll('.button')[0];
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            let correctImg = document.querySelectorAll('.correct')[0];
          
            correctImg.style.opacity = '1';
            setTimeout(()=>{
                window.location.href = '/../index.html'
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
function cadastro() {
    let correctImg = document.querySelectorAll('.correct')[1];
    correctImg.style.opacity = '1'
    setTimeout(()=>{
        window.location.href = '/../index.html'
    }, 1000);
}