function load(pagina) {
    console.log(pagina);
    switch (pagina) {
        case 'home':
            window.location.href='/assets/pages/home.html';
            break;
    case 'login':
        window.location.href='/assets/pages/login.html';
        break;
        case 'sobre':
            window.location.href='/assets/pages/sobre.html';
            break;
            // case 'contato':
            // window.location.href='/assets/pages/sobre.html';
            // break;
        default:
            'home';
            break;
    }
}
function logged() {
    auth.onAuthStateChanged((user)=>{
        if (user) {
            // aparece a aba usuario
            let userLogged = document.getElementById('onlylogged');
            userLogged.style.display = 'inline';
        } else {
            // aparece a opção de logar
            let userNotLogged = document.getElementById('login');
            userNotLogged.style.display = 'inline';
        }
    })
}