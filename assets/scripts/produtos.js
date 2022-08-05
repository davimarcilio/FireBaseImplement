
function VisualizeProds(docProdData) {
    let produtos = document.getElementById('produtosGrid');
    auth.onAuthStateChanged((user) => {
        if (user) {
            if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
                produtos.innerHTML +=
                    `<div class="produto" id="produto">
           <img class="imgProd" src="" alt="Foto do produto">
           <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod} ${docProdData.marca_prod}</h3>
           <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
           <button onclick="EditProd(this)" class="btteditprod" id="${docProdData.doc_ID}" name="btteditprod" type="button">
           <img class="editProdIcon" src="../images/editProd.svg" alt="iconeditprod">
           </button>
           </div>
           `;
            } else {
                produtos.innerHTML +=
                    `<div class="produto" id="produto">
           <img class="imgProd" src="" alt="Foto do produto">
           <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod} ${docProdData.marca_prod}</h3>
           <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
           <button onclick="SetPageCar(this)" class="bttcomprar" id="${docProdData.doc_ID}" name="bttcomprar" type="button">Comprar</button>
           </div>
           `;
            }
        } else {
            produtos.innerHTML +=
                `<div class="produto" id="produto">
   <img class="imgProd" src="" alt="Foto do produto">
   <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod} ${docProdData.marca_prod}</h3>
   <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
   <button onclick="SetPageCar(this)" class="bttcomprar" id="${docProdData.doc_ID}" name="bttcomprar" type="button">Comprar</button>
   </div>
   `;
        }
    })
}
function SetPageProdutos() {
    db.collection('Categorias').get()
        .then((Snapshot) => {
            Snapshot.forEach((docCateg) => {
                let categorias = docCateg.data();
                let categoriaFilter = document.getElementById('filtrarid');
                categoriaFilter.innerHTML += `<option value="${docCateg.id}">${categorias.nome_categ}</option>`;
                PesqFilter();
            });
        }).catch((err) => {
            console.log(err);
        });
}
function SetPageCar(element) {
    auth.onAuthStateChanged((user) => {
        if (user) {
                db.collection('Usuários').where('uid_user', '==', user.uid).get()
                    .then((SnapShotUser) => {
                        SnapShotUser.forEach(docUser => {
                            db.collection('Produtos').where('doc_ID', '==', element.id).get()
                                .then((SnapShotProd) => {
                                    SnapShotProd.forEach(docProd => {
                                        db.collection('Usuários').doc(docUser.id).update({
                                            currentEdit: {
                                                prod_id_edit: docProd.data().doc_ID,
                                                prod_nome_edit: docProd.data().nome_prod,
                                                prod_desc_edit: docProd.data().desc_prod,
                                                prod_marca_edit: docProd.data().marca_prod,
                                                prod_preco_edit: docProd.data().preco_prod,
                                                prod_gen_edit: docProd.data().gen_prod,
                                                prod_id_categ_edit: docProd.data().id_categ,
                                            },
                                        }).then(() => {
                                            load('produtopage');
                                        }).catch((err)=>{
                                            console.log(err);
                                        });
                                    });
                                }).catch((err)=>{
                                    console.log(err);
                                });
                        });
                    }).catch((err)=>{
                        console.log(err);
                    });
        } else {
            load('login');
        }
    })
}
function EditProd(element) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
                db.collection('Usuários').where('uid_user', '==', user.uid).get()
                    .then((SnapShotUser) => {
                        SnapShotUser.forEach(docUser => {
                            db.collection('Produtos').where('doc_ID', '==', element.id).get()
                                .then((SnapShotProd) => {
                                    SnapShotProd.forEach(docProd => {
                                        db.collection('Usuários').doc(docUser.id).update({
                                            currentEdit: {
                                                prod_id_edit: docProd.data().doc_ID,
                                                prod_nome_edit: docProd.data().nome_prod,
                                                prod_desc_edit: docProd.data().desc_prod,
                                                prod_marca_edit: docProd.data().marca_prod,
                                                prod_preco_edit: docProd.data().preco_prod,
                                                prod_gen_edit: docProd.data().gen_prod,
                                                prod_id_categ_edit: docProd.data().id_categ,
                                            },
                                        }).then(() => {
                                            load('adminEditProd');
                                        }).catch((err)=>{
                                            console.log(err);
                                        });
                                    });
                                }).catch((err)=>{
                                    console.log(err);
                                });
                        });
                    }).catch((err)=>{
                        console.log(err);
                    });
            }
        } else {
            load('login');
        }
    })
}
function PesqFilter() {
    let produtos = document.getElementById('produtosGrid');
    let Filterid = document.getElementById('filtrarid').value;
    let pesqInput = document.getElementById('pesquisar');
    pesqInput.value = '';
    if (Filterid != '0') {
        db.collection('Produtos').where('id_categ', '==', Filterid).get().then((Snapshot) => {
            produtos.innerHTML = '';
            Snapshot.forEach((docProd) => {
                let docProdData = docProd.data();
                VisualizeProds(docProdData);
            });
        }).catch((err) => {
            console.log(err);
        });
    } else {
        db.collection('Produtos').get().then((Snapshot) => {
            produtos.innerHTML = '';
            Snapshot.forEach((docProd) => {
                let docProdData = docProd.data();
                VisualizeProds(docProdData);
            });
        }).catch((err) => {
            console.log(err);;
        })
    }
}

function search() {
    let produtos = document.getElementById('produtosGrid');
    let pesqInput = document.getElementById('pesquisar').value.toUpperCase();
    let searchError = document.querySelector('.search0');
    let marcapesq = 0;
    let nomepesq = 0;
    db.collection('Produtos').orderBy('nome_prod').startAt(pesqInput).endAt(pesqInput + '\uf8ff').get()
        .then((Snapshot) => {
            produtos.innerHTML = '';
            if (Snapshot.docs.length <= 0 && marcapesq <= 0) {
                searchError.style.display = 'flex';
            } else {
                nomepesq = 1;
                searchError.style.display = 'none';
                Snapshot.forEach((docProd) => {
                    docProdData = docProd.data();
                    VisualizeProds(docProdData);
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    db.collection('Produtos').orderBy('marca_prod').startAt(pesqInput).endAt(pesqInput + '\uf8ff').get()
        .then((Snapshot) => {
            produtos.innerHTML = '';
            if (Snapshot.docs.length <= 0 && nomepesq <= 0) {
                searchError.style.display = 'flex';

            } else {
                marcapesq = 1;
                searchError.style.display = 'none';
                Snapshot.forEach((docProd) => {
                    docProdData = docProd.data();
                    VisualizeProds(docProdData);
                });
            }
        }).catch((err) => {
            console.log(err);
        })
}
