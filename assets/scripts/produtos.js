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
                   </div>
                   `
                    });
                }).catch((err) => {
                    ErrorCode('Erro', err, 'Red');
                })
            }


}