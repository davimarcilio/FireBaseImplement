function logar() {
    let email = document.getElementById('loginemail').value;
    let password = document.getElementById('loginpassword').value;
   
    if (password.length > 6 && email.length > 6)  {
        auth.createUserWithEmailAndPassword(email, password).then(()=>{
            let correctImg = document.querySelectorAll('.correct')[0];
            correctImg.style.opacity = '1'
            setTimeout(()=>{
                window.location.href = '/../index.html'
            }, 1000);
        }).catch((err=>{
            let errCode = err.code;
            let errMsg = err.message;
        }));
    }
}
function cadastro() {
    let correctImg = document.querySelectorAll('.correct')[1];
    correctImg.style.opacity = '1'
    setTimeout(()=>{
        window.location.href = '/../index.html'
    }, 1000);
}