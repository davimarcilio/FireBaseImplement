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
    try {
       var homeimg = document.querySelector('.homeimg');
       var hamburgmenuopen = document.querySelector('.responsivityHamburguerMenu');
    } catch (error) {
        console.log(error);
    }
    auth.onAuthStateChanged((user) => { 
        let meniu = document.querySelectorAll('.responsivity');
        if (user) {
            if (window.matchMedia("(min-width: 775px)").matches) {
            userNotLogged.style.display = 'none';
            userLogged.style.display = 'inline';
            hamburgmenuopen.style.display = 'none'
           
            
            try {
                homeimg.style.position = 'relative';
            } catch (error) {
                console.log(error);
            }
              } else {
                try {
                    homeimg.style.position = 'static';
                } catch (error) {
                    console.log(error);
                }
                userNotLogged.style.display = 'none';
                userLogged.style.display = 'none';
                meniu[5].style.display = 'inline';
              }
            
        } else {
            
            if (window.matchMedia("(min-width: 775px)").matches) {
               userLogged.style.display = 'none';
            userNotLogged.style.display = 'inline';
            
            try {
                homeimg.style.position = 'relative';
            } catch (error) {
                console.log(error);
            }
              } else {
                try {
                    homeimg.style.position = 'static';
                } catch (error) {
                    console.log(error);
                }
                userLogged.style.display = 'none';
            userNotLogged.style.display = 'none';
            meniu[4].style.display = 'inline';
              }
            
        }
    })
}
function ResponsiveHamMenu() {
    var hamburgmenuopen = document.querySelector('.responsivityHamburguerMenu');
    const hamburguerMenu = document.querySelector('.hamburguer');
    let meniu = document.querySelectorAll('.responsivity');
   if (hamburguerMenu.classList.toggle('active')) {
    hamburgmenuopen.style.backgroundColor = 'aqua';
    hamburgmenuopen.style.display = 'flex';
    meniu[6].style.display = 'inline';
    meniu[7].style.display = 'inline';
   } else {
    hamburgmenuopen.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    hamburgmenuopen.style.display = 'none';
   }
    
}
// setTimeout(() => {
//     auth.signOut().then(()=>{
//     console.log('deslogado');
// }).catch((err)=>{
//     console.log(err);
// })
// }, 10000);