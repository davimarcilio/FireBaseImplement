function CreateTamProds() {
    var alltamanhos = [];
    let tamanho = document.getElementById('tamProdEdit').value;
    let quantidade = document.getElementById('qtdProdEdit').value;
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).get()
                            .then((docProd) => {
                                docProd.data().tamanhos.forEach(tamanhos => {
                                    alltamanhos.push(tamanhos.tamanho);
                                });
                                if (alltamanhos.every(elem => elem != tamanho)) {
                                    db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).update({
                                        tamanhos: firebase.firestore.FieldValue.arrayUnion({
                                            tamanho: tamanho,
                                            quantidade: parseInt(quantidade),
                                        })
                                    }).then(() => {
                                        // load('produtos');
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                } else {
                                    db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).update({
                                        tamanhos: firebase.firestore.FieldValue.arrayUnion({
                                            tamanho: tamanho,
                                            quantidade: parseInt(quantidade),
                                        })
                                    }).then(() => {
                                        db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).get()
                                        .then((docProd)=>{
                                          docProd.data().tamanhos.forEach(alltamanhosstring => {
                                            if ((tamanho == alltamanhosstring.tamanho) && (alltamanhosstring.quantidade != quantidade)) {
                                                db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).update({
                                        tamanhos: firebase.firestore.FieldValue.arrayRemove({
                                            tamanho: tamanho,
                                            quantidade: alltamanhosstring.quantidade,
                                        })
                                       })
                                            }
                                          });
                                    })
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }
                            })
                    });
                })
        }
    })
}
function SetTams() {
    let TamCadastrados = document.getElementById('TamCadastrados');
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).get()
                            .then((docProd) => {
                                docProd.data().tamanhos.forEach(tamanhosProd => {
                                    TamCadastrados.innerHTML += `<option value="${tamanhosProd.tamanho}">${tamanhosProd.tamanho}</option>`;
                                });
                            })
                    });
                })
        }
    })
}
function SetTamQTDalter() {
    let TamCadastrados = document.getElementById('TamCadastrados').value;
    let tamanho = document.getElementById('tamProdEdit');
    let quantidade = document.getElementById('qtdProdEdit');
    auth.onAuthStateChanged((user) => {
        if (user.uid == 'g3FXmjoYUbgyeNg2y0l7x00PPsv2') {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).get()
                            .then((docProd) => {
                                docProd.data().tamanhos.forEach(tamanhosProd => {
                                 if (tamanhosProd.tamanho == TamCadastrados) {
                                    tamanho.value = tamanhosProd.tamanho;
                                    quantidade.value = tamanhosProd.quantidade
                                 }
                                });
                            })
                    });
                })
        }
    })
}