function SetCarrinho() {
    let produtos = document.getElementById('produtosGrid');
    let allids = [];
    let allqtd = [];
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        docUserData.carrinho.forEach(carrinhoId_Prod => {
                            allids.push(carrinhoId_Prod.prod_id_car);
                            allqtd.push(carrinhoId_Prod.prod_qtd_car);
                            console.log(carrinhoId_Prod.prod_qtd_car);
                            console.log(carrinhoId_Prod);

                            produtos.innerHTML += `
                            <div class="produto" id="produto">
                            <img class="imgProd prodItem" src="" alt="Foto do produto">
                            <h3 class="nomeProd prodItem" id="nomeProd">${carrinhoId_Prod.prod_nome_car}</h3>
                            <p class="quantidade prodItem" id="qtdProd">Quantidade ${carrinhoId_Prod.prod_qtd_car} </p>
                            <h4 class="precoProd prodItem" id="precoProd">R$ ${carrinhoId_Prod.prod_preco_car}</h4>
                            <div class="buttons prodItem">
                                <button id="${carrinhoId_Prod.prod_id_car}" onclick="moreItems(this)" class="buttonClass" name="moreItems" id="moreItems">
                                    <img class="imgIcons" src="../images/addictionicon.svg" alt="More">
                                </button>
                                <Button onclick="lessItems()" class="buttonClass" name="lessItems" id="lessItems">
                                    <img class="imgIcons" src="../images/subtractionicon.svg" alt="Less">
                                </Button>
                            </div>
                        </div>
                            `;
                            //     db.collection('Produtos').where('doc_ID', 'in', allids).get()
                            //         .then((SnapShotProdFiltred) => {
                            //             // produtos.innerHTML = '';
                            //             SnapShotProdFiltred.forEach((docProdFiltred) => {

                            //                 produtos.innerHTML += `
                            //             <div class="produto" id="produto">
                            //             <img class="imgProd prodItem" src="" alt="Foto do produto">
                            //             <h3 class="nomeProd prodItem" id="nomeProd">${docProdFiltred.data().nome_prod}</h3>
                            //             <p class="quantidade prodItem" id="qtdProd">Quantidade ${carrinhoId_Prod.prod_qtd_car} </p>
                            //             <h4 class="precoProd prodItem" id="precoProd">R$ ${docProdFiltred.data().preco_prod}</h4>
                            //             <div class="buttons prodItem">
                            //                 <button id="${docProdFiltred.data().doc_ID}" data-qtd="${allqtd}" onclick="moreItems(this)" class="buttonClass" name="moreItems" id="moreItems">
                            //                     <img class="imgIcons" src="../images/addictionicon.svg" alt="More">
                            //                 </button>
                            //                 <Button onclick="lessItems()" class="buttonClass" name="lessItems" id="lessItems">
                            //                     <img class="imgIcons" src="../images/subtractionicon.svg" alt="Less">
                            //                 </Button>
                            //             </div>
                            //         </div>
                            //             `;
                            //             });
                            //         }).catch((err) => {
                            //             console.log(err);
                            //         })
                        });
                    });

                }).catch((err) => {
                    console.log(err);

                })
        } else {
            load('home');
        }
    });
}
function moreItems(element) {
    console.log(element.id);
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
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: docProd.data().tam_prod,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            }).then(() => {
                                                load('carrinho');
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                            db.collection('Usuários').doc(docUser.id).update({
                                                carrinho: firebase.firestore.FieldValue.arrayRemove({
                                                    prod_id_car: carrinhoId_Prod.prod_id_car,
                                                    prod_qtd_car: carrinhoId_Prod.prod_qtd_car,
                                                    prod_nome_car: docProd.data().nome_prod,
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: docProd.data().tam_prod,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            }).then(() => {
                                                load('carrinho');
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                            })
                                        })
                                        }else {
                                            console.log('patunds');
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