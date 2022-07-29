function SetCateg() {
    db.collection('Categorias').get().then((Snapshot) => {
        Snapshot.forEach((docCateg) => {
            let categorias = docCateg.data();
            let categoriaFilter = document.getElementById('filtrarid');
            categoriaFilter.innerHTML += `<option value="${docCateg.id}">${categorias.nome_categ}</option>`;
            let Filterid = document.getElementById('filtrarid').value;
        });
    }).catch((err) => {
        ErrorCode('Erro', err, 'Red');
    });
}
function SetProds() {
    let produtos = document.getElementById('produtosGrid');
    produtos.innerHTML = '';
    let Filterid = document.getElementById('filtrarid').value;
    if (Filterid != '0') {
        produtos.innerHTML = '';
        db.collection('Produtos').where('id_categ', '==', Filterid).get().then((Snapshot) => {
            Snapshot.forEach((docProd) => {
                docProdData = docProd.data();
                produtos.innerHTML +=
                    `<div class="produto" id="produto">
                   <img class="imgProd" src="" alt="Foto do produto">
                   <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod}</h3>
                   <p class="descProd" id="descProd">${docProdData.desc_prod}</p>
                   <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
                   <button onclick="SetCar()" id="bttcomprar" name="bttcomprar" type="button">Comprar</button>
                   </div>
                   `
            });
        }).catch((err) => {
            ErrorCode('Erro', err, 'Red');
        });
    } else {
        produtos.innerHTML = '';
        db.collection('Produtos').get().then((Snapshot) => {
            Snapshot.forEach((docProd) => {
                let produtos = document.getElementById('produtosGrid');
                docProdData = docProd.data();
                produtos.innerHTML +=
                    `<div class="produto" id="produto">
                   <img class="imgProd" src="" alt="Foto do produto">
                   <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod}</h3>
                   <p class="descProd" id="descProd">${docProdData.desc_prod}</p>
                   <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
                   <button onclick="SetCar(this)" id="${docProd.id}" name="bttcomprar" type="button">Comprar</button>
                   </div>
                   `
            });
        }).catch((err) => {
            ErrorCode('Erro', err, 'Red');
        })
    }
}
function SetCar(element) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((Snapshot) => {
                    Snapshot.forEach((doc) => {
                        db.collection('Usuários').doc(doc.id).update({
                            carrinho: firebase.firestore.FieldValue.arrayUnion(element.id),
                        })
                        ErrorCode('Produto Adicionado', 'Com Sucesso', 'Green');
                        setTimeout(() => {
                            load('carrinho');
                        }, 3000);
                    });
                }).catch((err) => {
                    ErrorCode('Erro', err, 'Red');
                })
        } else {
            load('login');
        }
    })
}
function pesquisar() {
    let produtos = document.getElementById('produtosGrid');
    let pesqInput = document.getElementById('pesquisar').value;
    db.collection('Produtos').orderBy('nome_prod').startAt(pesqInput).endAt(pesqInput+'\uf8ff').get().then((Snapshot) => {
        produtos.innerHTML='';
        Snapshot.forEach((docProd) => {
            docProdData = docProd.data();
            produtos.innerHTML +=
                `<div class="produto" id="produto">
               <img class="imgProd" src="" alt="Foto do produto">
               <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod}</h3>
               <p class="descProd" id="descProd">${docProdData.desc_prod}</p>
               <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
               <button onclick="SetCar()" id="bttcomprar" name="bttcomprar" type="button">Comprar</button>
               </div>
               `
        });
    })
}