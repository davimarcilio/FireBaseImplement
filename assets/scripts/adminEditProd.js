var SecondsTimeLimitConfNumbers = 15;
var TimeoutSetClear;
var IntervalSetClear;
function SetEditProd() {
    let nomeProdEdit = document.getElementById('nomeProdEdit');
    let descProdEdit = document.getElementById('descProdEdit');
    let marcaProdEdit = document.getElementById('marcaProdEdit');
    let precoProdEdit = document.getElementById('precoProdEdit');
    let SetGen = document.getElementById('SetGen');
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
    // let tamProdEdit = document.getElementById('tamProdEdit').value;
    // let qtdProdEdit = document.getElementById('qtdProdEdit').value;
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
                            // qtd_prod: parseInt(qtdProdEdit),
                            // tam_prod: tamProdEdit,
                            id_categ: SetCateg,
                        }).then(() => {
                            toggleButtonCorrect(0);
                            setTimeout(() => {
                                load('produtos');
                            }, 500);

                        }).catch((err) => {
                            console.log(err);
                            toggleButtonError(0);
                        })
                    });
                }).catch((err) => {
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
function DeleteProd() {
    let ConfExclude = document.getElementById('ConfExclude');
    ConfExclude.style.display = 'flex';
    ConfExclude.innerHTML = `<h5>Você tem certeza que deseja excluir este produto?</h5>
   <button onclick="ConfExcludeyes()" class="bttConfExclude">Sim</button>
   <button onclick="ConfExcludeno()" class="bttConfExclude">Não</button>`;
}
function ConfExcludeno() {
    let ConfExclude = document.getElementById('ConfExclude');
    ConfExclude.style.display = 'none';
}
function SecondsTimeLimitConf() {
    let NumberProgress = document.getElementById('NumberProgress');
    SecondsTimeLimitConfNumbers--;
    NumberProgress.innerHTML = `Excluindo Produto ${SecondsTimeLimitConfNumbers} S Restantes`;
}
function ConfExcludeyes() {
    SecondsTimeLimitConfNumbers = 15;
    let ConfExclude = document.getElementById('ConfExclude');
    ConfExclude.style.display = 'flex';
    ConfExclude.innerHTML = ` <h5 id="NumberProgress">Excluindo Produto 15 S Restantes</h5>
   <div class="container">
       <div class="progress-bar" id="ProgressBAR"></div>
   </div>
   <button class="bttConfExclude" onclick="CancelTimer()">CANCELAR</button>`;
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            IntervalSetClear = setInterval(SecondsTimeLimitConf, 1000);
            TimeoutSetClear = setTimeout(() => {
                db.collection('Usuários').where('uid_user', '==', user.uid).get()
                    .then((SnapShotUser) => {
                        SnapShotUser.forEach(docUser => {
                            docUserData = docUser.data();
                            db.collection('Produtos').doc(docUserData.currentEdit.prod_id_edit).delete()
                                .then(() => {
                                    load('produtos');
                                }).catch((err) => {
                                    console.log(err);
                                })
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
            }, 15000);

        } else {
            load('home');
        }

    })
}
function CancelTimer() {
    clearInterval(IntervalSetClear);
    clearTimeout(TimeoutSetClear);
    let ProgressBar = document.getElementById('ProgressBAR');
    ProgressBar.style.animationPlayState = 'paused';
    setTimeout(() => {
        let ConfExclude = document.getElementById('ConfExclude');
        ConfExclude.style.display = 'none';
    }, 2000)
}