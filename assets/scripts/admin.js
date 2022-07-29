function confereadm() {
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            
    }else{
         load('home');
    }
})
}
function cadastrarCateg() {
    let nomeCateg = document.getElementById('nomeCat').value;
    let descCateg = document.getElementById('descCat').value;
    db.collection('Categorias').add({
              nome_categ: nomeCateg,
              desc_categ: descCateg,
    }).then((doc)=>{
        toggleButtonCorrect(0);
        setTimeout(() => {
               ErrorCode('Categoria Criada', 'Com Sucesso', 'Green');
        }, 300);
           setTimeout(() => {
            load('categoriaAdmin');
           }, 3000);
    }).catch((error)=>{
        toggleButtonError(0);
        setTimeout(() => {
            ErrorCode('Erro ao criar categoria', error, 'Red');
        }, 300);
        setTimeout(() => {
            load('categoriaAdmin');
        }, 3000);
    })
}