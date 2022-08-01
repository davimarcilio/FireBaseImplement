function load(page) {
    let pagename = '';
    switch (page) {
        case 'home':
            window.location.href = `${pagename}/assets/pages/home.html`;
            break;
        case 'login':
            window.location.href = `${pagename}/assets/pages/login.html`;
            break;
        case 'sobre':
            window.location.href = `${pagename}/assets/pages/sobre.html`;
            break;
        case 'user':
            window.location.href = `${pagename}/assets/pages/user.html`;
            break;
        case 'cadastrar':
            window.location.href = `${pagename}/assets/pages/cadastrar.html`;
            break;
        case 'admin':
            window.location.href = `${pagename}/assets/pages/admin.html`;
            break;
        case 'categoriaAdmin':
            window.location.href = `${pagename}/assets/pages/categoriaAdmin.html`;
            break;
        case 'produtoAdmin':
            window.location.href = `${pagename}/assets/pages/produtoAdmin.html`;
            break;
        case 'produtos':
            window.location.href = `${pagename}/assets/pages/produtos.html`;
            break;
        case 'carrinho':
            window.location.href = `${pagename}/assets/pages/carrinho.html`;
            break;
        default:
            window.location.href = `${pagename}/assets/pages/home.html`;
            break;
    }
}
function TrySobreHome(argumentnum) {
    // Pagina Sobre
    try {
        var sobre = document.querySelector('.sobre');
    } catch (error) {
        console.log(error);
    }
    //Pagina Home
    try {
        var homeimg = document.querySelector('.homeimg');
    } catch (error) {
        console.log(error);
    }
    //Pagina Sobre
    if (argumentnum == '1') {
        try {
            sobre.style.position = 'absolute';
        } catch (error) {
            console.log(error);
        }
        try {
            homeimg.style.position = 'relative';

        } catch (error) {
            console.log(error);
        }
        try {
            userImg.style.display = 'flex';

        } catch (error) {
            console.log(error);
        }
        //Pagina Home
    } if (argumentnum == '2') {
        try {
            sobre.style.position = 'static';
        } catch (error) {
            console.log(error);
        }
        try {
            homeimg.style.position = 'static';

        } catch (error) {
            console.log(error);
        }

    }
}
// function logged() {
//     let userLogged = document.getElementById('onlylogged');
//     var hamburgmenuopen = document.querySelector('.responsivityHamburguerMenu');
//     let userNotLogged = document.getElementById('login');
//     auth.onAuthStateChanged((user) => {
//         let admin = document.getElementById('admin');
//         let meniu = document.querySelectorAll('.responsivity');
//         const hamburguerMenu = document.querySelector('.hamburguer');
//         let responsivityHamburguerMenu = document.querySelector('.responsivityHamburguerMenu');
//         if (user) {
//             try {
//                 if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {

//                     meniu[8].style.display = 'inline';
//                     if (window.matchMedia("(min-width: 775px)").matches) {
//                         userNotLogged.style.display = 'none';
//                         userLogged.style.display = 'inline';
//                         hamburgmenuopen.style.display = 'none';
//                         admin.style.display = 'inline';
//                         meniu[4].style.display = 'none';
//                         meniu[5].style.display = 'none';
//                         meniu[6].style.display = 'none';
//                         meniu[7].style.display = 'none';
//                         meniu[8].style.display = 'none';
//                         responsivityHamburguerMenu.style.display = 'none';
//                         TrySobreHome('1');
//                     } else {
//                         TrySobreHome('2');
//                         responsivityHamburguerMenu.style.display = 'flex';
//                         if (hamburguerMenu.classList.contains("active")) {
//                             meniu[4].style.display = 'none';
//                             meniu[5].style.display = 'inline';
//                             meniu[6].style.display = 'inline';
//                             meniu[7].style.display = 'inline';
//                             meniu[8].style.display = 'inline';
//                         } else {
//                             meniu[4].style.display = 'none';
//                             meniu[5].style.display = 'none';
//                             meniu[6].style.display = 'none';
//                             meniu[7].style.display = 'none';
//                             meniu[8].style.display = 'none';
//                         }
//                         admin.style.display = 'none';
//                         userNotLogged.style.display = 'none';
//                         userLogged.style.display = 'none';

//                     }
//                 } else {
//                     if (window.matchMedia("(min-width: 775px)").matches) {
//                         userNotLogged.style.display = 'none';
//                         admin.style.display = 'none';
//                         userLogged.style.display = 'inline';
//                         hamburgmenuopen.style.display = 'none'
//                         meniu[4].style.display = 'none';
//                         meniu[5].style.display = 'none';
//                         meniu[6].style.display = 'none';
//                         meniu[7].style.display = 'none';
//                         meniu[8].style.display = 'none';
//                         responsivityHamburguerMenu.style.display = 'none';
//                         TrySobreHome('1');
//                     } else {
//                         TrySobreHome('2');
//                         responsivityHamburguerMenu.style.display = 'flex';
//                         if (hamburguerMenu.classList.contains("active")) {
//                             meniu[4].style.display = 'none';
//                             meniu[5].style.display = 'inline';
//                             meniu[6].style.display = 'inline';
//                             meniu[7].style.display = 'inline';
//                             meniu[8].style.display = 'none';
//                         } else {
//                             meniu[4].style.display = 'none';
//                             meniu[5].style.display = 'none';
//                             meniu[6].style.display = 'none';
//                             meniu[7].style.display = 'none';
//                             meniu[8].style.display = 'none';
//                         }
//                         admin.style.display = 'none';
//                         userNotLogged.style.display = 'none';
//                         userLogged.style.display = 'none';

//                     }
//                 }
//             } catch (error) {
//                 console.log(error);
//             }

//         } else {

//             if (window.matchMedia("(min-width: 775px)").matches) {
//                 userLogged.style.display = 'none';
//                 userNotLogged.style.display = 'inline';
//                 admin.style.display = 'none';
//                 meniu[4].style.display = 'none';
//                 meniu[5].style.display = 'none';
//                 meniu[6].style.display = 'none';
//                 meniu[7].style.display = 'none';
//                 meniu[8].style.display = 'none';
//                 responsivityHamburguerMenu.style.display = 'none';
//                 TrySobreHome('1');
//             } else {
//                 TrySobreHome('2');
//                 // ResponsiveHamMenu();
//                 if (hamburguerMenu.classList.contains("active")) {
//                     meniu[4].style.display = 'inline';
//                     meniu[5].style.display = 'none';
//                     meniu[6].style.display = 'inline';
//                     meniu[7].style.display = 'inline';
//                     meniu[8].style.display = 'inline';
//                 }
//                 admin.style.display = 'none';
//                 userLogged.style.display = 'none';
//                 userNotLogged.style.display = 'none';
//             }

//         }
//     })
// }
function ResponsiveHamMenu() {
    var hamburgmenuopen = document.querySelector('.responsivityHamburguerMenu');
    const hamburguerMenu = document.querySelector('.hamburguer');
    let meniu = document.querySelectorAll('.responsivity');
    if (hamburguerMenu.classList.toggle('active')) {
        hamburgmenuopen.style.backgroundColor = 'gray';
        hamburgmenuopen.style.display = 'flex';
        logged();
        meniu[6].style.display = 'inline';
        meniu[7].style.display = 'inline';
    } else {
        hamburgmenuopen.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        hamburgmenuopen.style.display = 'none';
    }
}
function UserOrNot() {
    let UserOrNotDiv = document.getElementById('UserOrNot');
    let HamUserOrNot = document.getElementById('HamUserOrNot');
    auth.onAuthStateChanged((user) => {
        if (user) {
            HamUserOrNot.innerHTML =  `<a id="logged" class="HamMenu" onclick="load('user')"><li>User</li></a>`;
            UserOrNotDiv.innerHTML = `<a id="logged" class="responsivity" onclick="load('user')"><li>User</li></a>`;
            if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
               UserOrNotDiv.innerHTML += `<a id="admin" class="responsivity" onclick="load('admin')"><li>Admin</li></a>`;
               HamUserOrNot.innerHTML +=  `<a id="admin" class="HamMenu" onclick="load('admin')"><li>Admin</li></a>`;
            }
        }else{
           UserOrNotDiv.innerHTML = `<a id="login" class="responsivity" onclick="load('login')"><li>Entrar</li></a>`;
           HamUserOrNot.innerHTML +=  `<a id="login" class="HamMenu" onclick="load('login')"><li>Entrar</li></a>`;
        }
    })
}
function HamMenuActive() {
    const HamMenuButtons = document.querySelector('.HamMenuActive');
    const hamburguerMenu = document.querySelector('.hamburguer');
    if (hamburguerMenu.classList.toggle('active')) {
        HamMenuButtons.style.display = 'block';
    } else {
        HamMenuButtons.style.display = 'none';
    }
}