function load(page) {
    switch (page) {
        case 'home':
            window.location.href = '/assets/pages/home.html';
            break;
        case 'login':
            window.location.href = '/assets/pages/login.html';
            break;
        case 'sobre':
            window.location.href = '/assets/pages/sobre.html';
            break;
        case 'user':
            window.location.href = '/assets/pages/user.html';
            break;
        default:
            window.location.href = 'assets/pages/home.html';
            break;
    }
}
function logged() {
    let userLogged = document.getElementById('onlylogged');
    let userNotLogged = document.getElementById('login');
    auth.onAuthStateChanged((user) => {
        if (user) {
            // aparece a aba usuario
            userNotLogged.style.display = 'none';
            userLogged.style.display = 'inline';
        } else {
            // add opção logar

            userLogged.style.display = 'none';
            userNotLogged.style.display = 'inline';
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