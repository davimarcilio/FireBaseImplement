function SetCarrinho() {
    let produtos = document.getElementById('produtosGrid');
    let allids = [];
    let allqtd = [];
    let qtd = 1;
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        docUserData.carrinho.forEach(carrinhoId_Prod => {
                            allids.push(carrinhoId_Prod.prod_id_car);
                            allqtd.push(carrinhoId_Prod.prod_qtd_car);
                            produtos.innerHTML = '';
                        });
                        db.collection('Produtos').where('doc_ID', 'in', allids).get()
                            .then((SnapShotProdFiltred) => {
                                SnapShotProdFiltred.forEach((docProdFiltred) => {
                                    produtos.innerHTML += `
                                <div class="produto" id="produto">
                                <img class="imgProd prodItem" src="" alt="Foto do produto">
                                <h3 class="nomeProd prodItem" id="nomeProd">${docProdFiltred.data().nome_prod}</h3>
                                <p class="quantidade prodItem" id="qtdProd">Quantidade ${qtd} </p>
                                <h4 class="precoProd prodItem" id="precoProd">R$ ${docProdFiltred.data().preco_prod}</h4>
                                <div class="buttons prodItem">
                                    <button id="${docProdFiltred.data().doc_ID}" onclick="moreItems()" class="buttonClass" name="moreItems" id="moreItems">
                                        <img class="imgIcons" src="../images/addictionicon.svg" alt="More">
                                    </button>
                                    <Button onclick="lessItems()" class="buttonClass" name="lessItems" id="lessItems">
                                        <img class="imgIcons" src="../images/subtractionicon.svg" alt="Less">
                                    </Button>
                                </div>
                            </div>
                                `;
                                });
                            }).catch((err) => {
                                console.log(err);
                            })

                    });

                }).catch((err) => {
                    console.log(err);

                })
        } else {
            load('home');
        }
    });
}
function moreItems() {
    
}