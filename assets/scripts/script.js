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
        case 'adminEditProd':
            window.location.href = `${pagename}/assets/pages/adminEditProd.html`;
            break;
            case 'tamanhoAdmin':
                window.location.href = `${pagename}/assets/pages/tamanhosAdmin.html`;
                break;
        default:
            window.location.href = `${pagename}/assets/pages/home.html`;
            break;
    }
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
function UserOrNot() {
    let UserOrNotDiv = document.getElementById('UserOrNot');
    let HamUserOrNot = document.getElementById('HamUserOrNot');
    auth.onAuthStateChanged((user) => {
        if (user) {
            HamUserOrNot.innerHTML = `<a id="logged" class="HamMenu" onclick="load('user')"><li>User</li></a>`;
            UserOrNotDiv.innerHTML = `<a id="logged" class="responsivity" onclick="load('user')"><li>User</li></a>`;
            if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
                UserOrNotDiv.innerHTML += `<a id="admin" class="responsivity" onclick="load('admin')"><li>Admin</li></a>`;
                HamUserOrNot.innerHTML += `<a id="admin" class="HamMenu" onclick="load('admin')"><li>Admin</li></a>`;
            }
        } else {
            UserOrNotDiv.innerHTML = `<a id="login" class="responsivity" onclick="load('login')"><li>Entrar</li></a>`;
            HamUserOrNot.innerHTML += `<a id="login" class="HamMenu" onclick="load('login')"><li>Entrar</li></a>`;
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
function toggleButtonCorrect(i) {
    let incorrectX = document.querySelectorAll('.incorrect')[i];
    let buttonLogin = document.querySelectorAll('.button')[i];
    let correctImg = document.querySelectorAll('.correct')[i];
    let textButton = document.querySelectorAll('.text')[i];
    incorrectX.style.display = 'none';
    incorrectX.style.opacity = '0';
    buttonLogin.style.backgroundColor = '#44c98a';
    textButton.style.display = 'none';
    
    correctImg.style.display = 'inline';
    correctImg.style.opacity = '1';
    setTimeout(() => {
        buttonLogin.style.backgroundColor = '#282231';
        textButton.style.display = 'flex';
        correctImg.style.display = 'none';
        correctImg.style.opacity = '0';
    }, 3000);
}
function toggleButtonError(i) {
    let incorrectX = document.querySelectorAll('.incorrect')[i];
    let buttonLogin = document.querySelectorAll('.button')[i];
    let correctImg = document.querySelectorAll('.correct')[i];
    let textButton = document.querySelectorAll('.text')[i];
    correctImg.style.opacity = '0';
    correctImg.style.display = 'none';
    textButton.style.display = 'none';
    buttonLogin.style.backgroundColor = 'red';
    incorrectX.style.display = 'inline';
    incorrectX.style.opacity = '1';
    setTimeout(() => {
        buttonLogin.style.backgroundColor = '#282231';
        textButton.style.display = 'flex';
        incorrectX.style.display = 'none';
        incorrectX.style.opacity = '0';
    }, 3000);
}