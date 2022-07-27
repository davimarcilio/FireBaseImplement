function load() {
    window.location.href ='assets/pages/home.html';
}
function logged() {
    auth.onAuthStateChanged((user)=>{
        if (user) {
            // aparece a aba usuario
            let userLogged = document.getElementById('onlylogged');
            userLogged.style.display = 'inline';
            // tira a opção de logar
            let userNotLogged = document.getElementById('login');
            userNotLogged.style.display = 'none';
        } else {
            
        }
    })
}
// setTimeout(() => {
//     auth.signOut().then(()=>{
//     console.log('deslogado');
// }).catch((err)=>{
//     console.log(err);
// })
// }, 10000);