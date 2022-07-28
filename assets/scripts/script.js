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
            case 'cadastrar':
                window.location.href = '/assets/pages/cadastrar.html';
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
            if (window.matchMedia("(min-width: 775px)").matches) {
            userNotLogged.style.display = 'none';
            userLogged.style.display = 'inline';
              } else {
                userNotLogged.style.display = 'none';
                userLogged.style.display = 'none';
              }
            
        } else {
            if (window.matchMedia("(min-width: 775px)").matches) {
               userLogged.style.display = 'none';
            userNotLogged.style.display = 'inline';
              } else {
                userLogged.style.display = 'none';
            userNotLogged.style.display = 'none';
              }
            
        }
    })
}
function ResponsiveHamMenu() {
    const hamburguerMenu = document.querySelector('.hamburguer');
    hamburguerMenu.classList.toggle('active');
}
// setTimeout(() => {
//     auth.signOut().then(()=>{
//     console.log('deslogado');
// }).catch((err)=>{
//     console.log(err);
// })
// }, 10000);