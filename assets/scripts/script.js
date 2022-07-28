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
        case 'admin':
            window.location.href = '/assets/pages/admin.html';
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
        var sobre = document.querySelector('.sobre');
    } catch (error) {
        console.log(error);
    }
    try {
        var homeimg = document.querySelector('.homeimg');
        var hamburgmenuopen = document.querySelector('.responsivityHamburguerMenu');

    } catch (error) {
        console.log(error);
    }
    auth.onAuthStateChanged((user) => {
        let meniu = document.querySelectorAll('.responsivity');
        const hamburguerMenu = document.querySelector('.hamburguer');
        let responsivityHamburguerMenu = document.querySelector('.responsivityHamburguerMenu');
        if (user) {
            try {
                if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
                    meniu[8].style.display = 'inline';


                    // console.log(user.uid);
                    if (window.matchMedia("(min-width: 775px)").matches) {
                        userNotLogged.style.display = 'none';
                        userLogged.style.display = 'inline';
                        hamburgmenuopen.style.display = 'none'
                        meniu[4].style.display = 'none';
                        meniu[5].style.display = 'none';
                        meniu[6].style.display = 'none';
                        meniu[7].style.display = 'none';
                        meniu[8].style.display = 'none';
                        responsivityHamburguerMenu.style.display = 'none';
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
                    } else {
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
                        responsivityHamburguerMenu.style.display = 'flex';
                        if (hamburguerMenu.classList.contains("active")) {
                            meniu[4].style.display = 'none';
                            meniu[5].style.display = 'inline';
                            meniu[6].style.display = 'inline';
                            meniu[7].style.display = 'inline';
                            meniu[8].style.display = 'inline';
                        } else {
                            meniu[4].style.display = 'none';
                            meniu[5].style.display = 'none';
                            meniu[6].style.display = 'none';
                            meniu[7].style.display = 'none';
                            meniu[8].style.display = 'none';
                        }
                        userNotLogged.style.display = 'none';
                        userLogged.style.display = 'none';

                    }
                } else {
                    if (window.matchMedia("(min-width: 775px)").matches) {
                        userNotLogged.style.display = 'none';
                        userLogged.style.display = 'inline';
                        hamburgmenuopen.style.display = 'none'
                        meniu[4].style.display = 'none';
                        meniu[5].style.display = 'none';
                        meniu[6].style.display = 'none';
                        meniu[7].style.display = 'none';
                        meniu[8].style.display = 'none';
                        responsivityHamburguerMenu.style.display = 'none';
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
                    } else {
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
                        responsivityHamburguerMenu.style.display = 'flex';
                        if (hamburguerMenu.classList.contains("active")) {
                            meniu[4].style.display = 'none';
                            meniu[5].style.display = 'inline';
                            meniu[6].style.display = 'inline';
                            meniu[7].style.display = 'inline';
                            meniu[8].style.display = 'none';
                        } else {
                            meniu[4].style.display = 'none';
                            meniu[5].style.display = 'none';
                            meniu[6].style.display = 'none';
                            meniu[7].style.display = 'none';
                            meniu[8].style.display = 'none';
                        }
                        userNotLogged.style.display = 'none';
                        userLogged.style.display = 'none';

                    }
                }
            } catch (error) {
                console.log(error);
            }

        } else {

            if (window.matchMedia("(min-width: 775px)").matches) {
                userLogged.style.display = 'none';
                userNotLogged.style.display = 'inline';
                meniu[4].style.display = 'none';
                meniu[5].style.display = 'none';
                meniu[6].style.display = 'none';
                meniu[7].style.display = 'none';
                responsivityHamburguerMenu.style.display = 'none';
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
            } else {
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
                // ResponsiveHamMenu();
                if (hamburguerMenu.classList.contains("active")) {
                    meniu[4].style.display = 'inline';
                    meniu[5].style.display = 'none';
                    meniu[6].style.display = 'inline';
                    meniu[7].style.display = 'inline';
                }
                userLogged.style.display = 'none';
                userNotLogged.style.display = 'none';
            }

        }
    })
}
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
// setTimeout(() => {
//     auth.signOut().then(()=>{
//     console.log('deslogado');
// }).catch((err)=>{
//     console.log(err);
// })
// }, 10000);
function Admin() {
    auth.onAuthStateChanged((user) => {

    })
}