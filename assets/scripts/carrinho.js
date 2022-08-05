function SetCarrinho() {
    let produtos = document.getElementById('produtosGrid');
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    if (SnapShotUser.empty == true) {
                        TemProduto();
                    } else {
                        SnapShotUser.forEach(docUser => {
                            let docUserData = docUser.data();
                            if (docUserData.carrinho == undefined) {
                                TemProduto();
                            }
                            if (docUserData.carrinho == '') {
                                TemProduto()
                            }
                            docUserData.carrinho.forEach(carrinhoId_Prod => {
                                if (carrinhoId_Prod.prod_qtd_car == 0 && docUserData.carrinho.length == 1) {
                                    TemProduto()
                                }
                                if (carrinhoId_Prod.prod_qtd_car < 1) {
                                    db.collection('Usuários').doc(docUser.id).update({
                                        carrinho: firebase.firestore.FieldValue.arrayRemove({
                                            prod_id_car: carrinhoId_Prod.prod_id_car,
                                            prod_qtd_car: carrinhoId_Prod.prod_qtd_car,
                                            prod_nome_car: carrinhoId_Prod.prod_nome_car,
                                            prod_categ_id_car: carrinhoId_Prod.prod_categ_id_car,
                                            prod_marca_car: carrinhoId_Prod.prod_marca_car,
                                            prod_preco_car: carrinhoId_Prod.prod_preco_car,
                                            prod_tamanho_car: carrinhoId_Prod.prod_tamanho_car,
                                            prod_desc_car: carrinhoId_Prod.prod_desc_car,
                                        }),
                                    }).then(() => {
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                                } else {
                                    db.collection('Categorias').where('doc_ID', '==', carrinhoId_Prod.prod_categ_id_car).get()
                                    .then((SnapShotCateg)=>{
                                        SnapShotCateg.forEach(docCateg => {
                                            produtos.innerHTML += `
                                      <div class="produto" id="produto">
                                      <img class="imgProd prodItem" src="" alt="Foto do produto">
                                      <h3 class="nomeProd prodItem" id="nomeProd">${docCateg.data().nome_categ} ${carrinhoId_Prod.prod_nome_car} ${carrinhoId_Prod.prod_marca_car}</h3>
                                      <p class="quantidade prodItem" id="qtdProd">Quantidade ${carrinhoId_Prod.prod_qtd_car} </p>
                                      <p>Tamanho ${carrinhoId_Prod.prod_tamanho_car}</p>
                                      <h4 class="precoProd prodItem" id="precoProd">R$ ${carrinhoId_Prod.prod_preco_car}</h4>
                                       <div class="buttons prodItem">
                                       <button id="${carrinhoId_Prod.prod_id_car}" onclick="moreItems(this)" class="buttonClass" name="moreItems">
                                       <img class="imgIcons" src="../images/addictionicon.svg" alt="More">
                                       </button>
                                       <Button id="${carrinhoId_Prod.prod_id_car}" onclick="lessItems(this)" class="buttonClass" name="lessItems">
                                       <img class="imgIcons" src="../images/subtractionicon.svg" alt="Less">
                                       </Button>
                                       </div>
                                       </div>
                                    `;
                                        });
                                    })
                                    
                                }
                            });
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            let NotUserApparently = document.getElementById('NotUserApparently');
            NotUserApparently.style.display = 'flex';
        }
    });
}
function TemProduto() {
    let CarrinhoVazio = document.getElementById('CarrinhoVazio');
    let buttonsCarrinho = document.getElementById('buttonsCarrinho');
    buttonsCarrinho.style.display = 'none';
    CarrinhoVazio.style.display = 'flex';
}
function moreItems(element) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        docUserData.carrinho.forEach(carrinhoId_Prod => {
                            if (carrinhoId_Prod.prod_id_car == element.id) {
                                db.collection('Produtos').where('doc_ID', '==', element.id).get()
                                    .then((SnapShotProd) => {
                                        SnapShotProd.forEach((docProd) => {
                                            db.collection('Usuários').doc(docUser.id).update({
                                                carrinho: firebase.firestore.FieldValue.arrayUnion({
                                                    prod_id_car: carrinhoId_Prod.prod_id_car,
                                                    prod_qtd_car: carrinhoId_Prod.prod_qtd_car + 1,
                                                    prod_nome_car: docProd.data().nome_prod,
                                                    prod_categ_id_car: docProd.data().id_categ,
                                                    prod_marca_car: docProd.data().marca_prod,
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: carrinhoId_Prod.prod_tamanho_car,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                            db.collection('Usuários').doc(docUser.id).update({
                                                carrinho: firebase.firestore.FieldValue.arrayRemove({
                                                    prod_id_car: carrinhoId_Prod.prod_id_car,
                                                    prod_qtd_car: carrinhoId_Prod.prod_qtd_car,
                                                    prod_nome_car: docProd.data().nome_prod,
                                                    prod_categ_id_car: docProd.data().id_categ,
                                                    prod_marca_car: docProd.data().marca_prod,
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: carrinhoId_Prod.prod_tamanho_car,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            }).then(() => {
                                                load('carrinho');
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        })
                                    })

                            }

                        });
                    })
                }).catch((err) => {
                    console.log(err);

                })
        } else {
            load('home');
        }
    });
}
function lessItems(element) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        docUserData.carrinho.forEach(carrinhoId_Prod => {
                            if (carrinhoId_Prod.prod_id_car == element.id) {
                                db.collection('Produtos').where('doc_ID', '==', element.id).get()
                                    .then((SnapShotProd) => {
                                        SnapShotProd.forEach((docProd) => {
                                            db.collection('Usuários').doc(docUser.id).update({
                                                carrinho: firebase.firestore.FieldValue.arrayUnion({
                                                    prod_id_car: carrinhoId_Prod.prod_id_car,
                                                    prod_qtd_car: carrinhoId_Prod.prod_qtd_car - 1,
                                                    prod_nome_car: docProd.data().nome_prod,
                                                    prod_categ_id_car: docProd.data().id_categ,
                                                    prod_marca_car: docProd.data().marca_prod,
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: carrinhoId_Prod.prod_tamanho_car,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                            db.collection('Usuários').doc(docUser.id).update({
                                                carrinho: firebase.firestore.FieldValue.arrayRemove({
                                                    prod_id_car: carrinhoId_Prod.prod_id_car,
                                                    prod_qtd_car: carrinhoId_Prod.prod_qtd_car,
                                                    prod_nome_car: docProd.data().nome_prod,
                                                    prod_categ_id_car: docProd.data().id_categ,
                                                    prod_marca_car: docProd.data().marca_prod,
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: carrinhoId_Prod.prod_tamanho_car,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            }).then(() => {
                                                load('carrinho');
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        })
                                    })

                            }
                        });
                    })
                }).catch((err) => {
                    console.log(err);

                })
        } else {

            load('home');
        }
    });
}