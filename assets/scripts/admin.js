function confereadm() {
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            
    }else{
         load('home');
    }
})
}
function cadastrarCateg() {
    let nomeCateg = document.getElementById('nomeCat').value.trim();
    let descCateg = document.getElementById('descCat').value.trim();
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
function cadastrarProd(){
    let nomeProd = document.getElementById('nomeProd').value.trim();
    let descProd = document.getElementById('descProd').value.trim();
    let precoProd = parseInt(document.getElementById('precoProd').value);
    let genProd = document.getElementById('genProd').value.trim();
    let marcaProd = document.getElementById('marcaProd').value.trim();
    let qtdProd = parseInt(document.getElementById('qtdProd').value);
    let tamProd = parseInt(document.getElementById('tamProd').value);
    db.collection('Produtos').add({
        nome_prod: nomeProd,
        desc_prod: descProd,
        preco_prod: precoProd,
        gen_prod: genProd,
        marca_prod: marcaProd,
        qtd_prod: qtdProd,
        tam_prod: tamProd,
}).then((doc)=>{
  toggleButtonCorrect(0);
  setTimeout(() => {
         ErrorCode('Produto Criado', 'Com Sucesso', 'Green');
  }, 300);
     setTimeout(() => {
      load('produtoAdmin');
     }, 3000);
}).catch((error)=>{
  toggleButtonError(0);
  setTimeout(() => {
      ErrorCode('Erro ao criar produto', error, 'Red');
  }, 300);
  setTimeout(() => {
      load('produtoAdmin');
  }, 3000);
})
}
function numbers(element) {
  element.value = element.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}