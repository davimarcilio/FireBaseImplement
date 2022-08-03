function SetEditProd() {
    let nomeProdEdit = document.getElementById('nomeProdEdit');
    let descProdEdit = document.getElementById('descProdEdit');
    let marcaProdEdit = document.getElementById('marcaProdEdit');
    let precoProdEdit = document.getElementById('precoProdEdit');
    let SetGen = document.getElementById('SetGen');
    let tamProdEdit = document.getElementById('tamProdEdit');
    let qtdProdEdit = document.getElementById('qtdProdEdit');
    let SetCateg = document.getElementById('SetCateg');
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            db.collection('Categorias').get()
                .then((Snapshot) => {
                    Snapshot.forEach((docCateg) => {
                        let categorias = docCateg.data();
                        SetCateg.innerHTML += `<option value="${docCateg.id}">${categorias.nome_categ}</option>`;
                    });
                }).catch((err) => {
                    console.log(err);
                });
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        docUserData = docUser.data();
                        nomeProdEdit.value = docUserData.currentEdit.prod_nome_edit;
                        descProdEdit.value = docUserData.currentEdit.prod_desc_edit;
                        marcaProdEdit.value = docUserData.currentEdit.prod_marca_edit;
                        precoProdEdit.value = docUserData.currentEdit.prod_preco_edit;
                        tamProdEdit.value = docUserData.currentEdit.prod_tamanho_edit;
                        qtdProdEdit.value = docUserData.currentEdit.prod_qtd_edit;
                        SetGen.value = docUserData.currentEdit.prod_gen_edit;
                        SetCateg.value = docUserData.currentEdit.prod_id_categ_edit;
                    });
                })
        } else {
            load('home');
        }
    })
}
function ChangeProd() {
    let nomeProdEdit = document.getElementById('nomeProdEdit').value;
    let descProdEdit = document.getElementById('descProdEdit').value;
    let marcaProdEdit = document.getElementById('marcaProdEdit').value;
    let precoProdEdit = document.getElementById('precoProdEdit').value;
    let SetGen = document.getElementById('SetGen').value;
    let tamProdEdit = document.getElementById('tamProdEdit').value;
    let qtdProdEdit = document.getElementById('qtdProdEdit').value;
    let SetCateg = document.getElementById('SetCateg').value;
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        docUserData = docUser.data();
                        db.collection('Produtos').doc(docUserData.currentEdit.prod_id_edit).update({
                            nome_prod: nomeProdEdit.trim().toUpperCase(),
                            desc_prod: descProdEdit.trim().toUpperCase(),
                            preco_prod: parseFloat(precoProdEdit).toFixed(2),
                            gen_prod: SetGen,
                            marca_prod: marcaProdEdit.toUpperCase(),
                            qtd_prod: parseInt(qtdProdEdit),
                            tam_prod: tamProdEdit,
                            id_categ: SetCateg,
                        }).then(()=>{
                            toggleButtonCorrect(0);
                            setTimeout(() => {
                                load('produtos');
                            }, 500);
                            
                        }).catch((err)=>{
                            console.log(err);
                            toggleButtonError(0);
                        })
                    });
                }).catch((err)=>{
                    console.log(err);
                    toggleButtonError(0);
                })
        } else {
            load('home');
        }
    })
}
function numbers(element) {
    element.value = element.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}