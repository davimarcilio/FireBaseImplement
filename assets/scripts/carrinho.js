var prodsincar = [];
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
                            docUserData.carrinho.sort().forEach(carrinhoId_Prod => {
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
                                        .then((SnapShotCateg) => {
                                            SnapShotCateg.forEach(docCateg => {
                                                prodsincar.push({
                                                    id: carrinhoId_Prod.prod_id_car,
                                                    qtd: carrinhoId_Prod.prod_qtd_car,
                                                    tamanho: carrinhoId_Prod.prod_tamanho_car,
                                                });
                                                console.log(prodsincar);
                                                produtos.innerHTML += `
                                      <div class="produto" id="produto">
                                      <img class="imgProd prodItem" src="" alt="Foto do produto">
                                      <h3 class="nomeProd prodItem" id="nomeProd">${docCateg.data().nome_categ} ${carrinhoId_Prod.prod_nome_car} ${carrinhoId_Prod.prod_marca_car}</h3>
                                      <p class="quantidade prodItem" id="qtdProd">Quantidade ${carrinhoId_Prod.prod_qtd_car} </p>
                                      <p>Tamanho ${carrinhoId_Prod.prod_tamanho_car}</p>
                                      <h4 class="precoProd prodItem" id="precoProd">R$ ${carrinhoId_Prod.prod_preco_car}</h4>
                                       <div class="buttons prodItem">
                                       <button id="${carrinhoId_Prod.prod_id_car}" data-tamanho="${carrinhoId_Prod.prod_tamanho_car}" onclick="moreItems(this)" class="buttonClass" name="moreItems">
                                       <img class="imgIcons" src="../images/addictionicon.svg" alt="More">
                                       </button>
                                       <Button id="${carrinhoId_Prod.prod_id_car}" data-tamanho="${carrinhoId_Prod.prod_tamanho_car}" onclick="lessItems(this)" class="buttonClass" name="lessItems">
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
function oklimitestoque() {
    let notestoque = document.getElementById('notestoque');
    notestoque.style.display = 'none';
}
function moreItems(element) {
    attribute = element.getAttribute('data-tamanho');
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        docUserData.carrinho.forEach(carrinhoId_Prod => {
                            if (carrinhoId_Prod.prod_id_car == element.id && attribute == carrinhoId_Prod.prod_tamanho_car) {
                                db.collection('Produtos').where('doc_ID', '==', element.id).get()
                                    .then((SnapShotProd) => {
                                        SnapShotProd.forEach((docProd) => {
                                            docProd.data().tamanhos.forEach(qtdforeachprod => {
                                                if (qtdforeachprod.tamanho == carrinhoId_Prod.prod_tamanho_car) {
                                                    if (qtdforeachprod.quantidade <= carrinhoId_Prod.prod_qtd_car) {
                                                        let notestoque = document.getElementById('notestoque');
                                                        notestoque.innerHTML = `${docProd.data().nome_prod} ${docProd.data().marca_prod} Atingiu o limite em estoque, NÃO é possivel adicionar mais <button id="oklimitestoque" onclick="oklimitestoque()">OK</button>`;
                                                        notestoque.style.display = 'flex';
                                                        setTimeout(() => {
                                                            notestoque.style.display = 'none';
                                                        }, 5000);
                                                    } else {
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
                                                    }
                                                } else {
                                                }
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
    attribute = element.getAttribute('data-tamanho');
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        docUserData.carrinho.forEach(carrinhoId_Prod => {
                            if (carrinhoId_Prod.prod_id_car == element.id && attribute == carrinhoId_Prod.prod_tamanho_car) {
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
function FinalizarCompra() {
    // attribute = element.getAttribute('data-tamanho');
    auth.onAuthStateChanged((user) => {
        if (user) {
            prodsincar.forEach(ProdnoCarrinho => {
                db.collection('Produtos').doc(ProdnoCarrinho.id).get()
                    .then((docProd) => {
                        docProd.data().tamanhos.forEach(tamanhosProd => {
                            if (tamanhosProd.tamanho == ProdnoCarrinho.tamanho) {
                                db.collection('Produtos').doc(ProdnoCarrinho.id).update({
                                    tamanhos: firebase.firestore.FieldValue.arrayUnion({
                                        tamanho: ProdnoCarrinho.tamanho,
                                        quantidade: tamanhosProd.quantidade - ProdnoCarrinho.qtd,
                                    }),
                                }).then(() => {
                                    db.collection('Produtos').doc(ProdnoCarrinho.id).update({
                                        tamanhos: firebase.firestore.FieldValue.arrayRemove({
                                            tamanho: ProdnoCarrinho.tamanho,
                                            quantidade: tamanhosProd.quantidade,
                                        }),
                                    }).then(() => {
                                      db.collection('Usuários').where('uid_user', '==', user.uid).get()
                                      .then((SnapShotUser)=>{
                                        SnapShotUser.forEach(docUser => {
                                            db.collection('Usuários').doc(docUser.id).update({
                                                carrinho: [],
                                            }).then(()=>{
                                                load('carrinho');
                                            })
                                        });
                                      })
                                    })
                                })
                            }

                        });




                    })

            })
        } else {
            load('home');
        }
    });
}