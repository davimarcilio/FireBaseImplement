function load(page) {
    switch (page) {
        case 'home':
            window.location.href ='/assets/pages/home.html';
            break;
            case 'login':
                window.location.href ='/assets/pages/login.html';
                break;
                case 'sobre':
                    window.location.href ='/assets/pages/sobre.html';
                    break;
        default:
             window.location.href ='assets/pages/home.html';
            break;
    }
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