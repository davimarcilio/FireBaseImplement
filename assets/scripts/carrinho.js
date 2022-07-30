function SetCarrinho() {
    auth.onAuthStateChanged((user) => {
        let produtos = document.getElementById('produtosGrid');
        produtos.innerHTML = '';
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        let docUserData = docUser.data();
                        console.log(docUserData.carrinho[0].prod_id_car);
                        db.collection('Produtos').where('doc_ID', 'in', docUserData.carrinho).get()
                            .then((SnapShotProdFiltred) => {

                                SnapShotProdFiltred.forEach((docProdFiltred) => {
                                    console.log(docProdFiltred.data());
                                    produtos.innerHTML += `
                                    <div class="produto" id="produto">
                                    <img class="imgProd prodItem" src="" alt="Foto do produto">
                                    <h3 class="nomeProd prodItem" id="nomeProd">${docProdFiltred.data().nome_prod}</h3>
                                    <p class="quantidade prodItem" id="qtdProd">Quantidade 1</p>
                                    <h4 class="precoProd prodItem" id="precoProd">R$ ${docProdFiltred.data().preco_prod}</h4>
                                    <div class="buttons prodItem">
                                        <button onclick="moreItems()" class="buttonClass" name="moreItems" id="moreItems">
                                            <img class="imgIcons" src="../images/addictionicon.svg" alt="More">
                                        </button>
                                        <Button onclick="lessItems()" class="buttonClass" name="lessItems" id="lessItems">
                                            <img class="imgIcons" src="../images/subtractionicon.svg" alt="Less">
                                        </Button>
                                    </div>
                                </div>
                                    `;
                                });
                            }).catch(() => {
                                console.log('nada');
                            })
                    });

                }).catch((err) => {
                    ErrorCode('Erro', err, 'Red');

                })
        } else {
            load('home');
        }
    });
}