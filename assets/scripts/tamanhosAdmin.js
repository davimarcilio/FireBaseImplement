function CreateTamProds() {
    var alltamanhos = [];
    let tamanho = document.getElementById('tamProdEdit').value;
    let quantidade = document.getElementById('qtdProdEdit').value;
    // let TamCadastrados = document.getElementById('TamCadastrados');
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
                                console.log(alltamanhos);
                                console.log(tamanho);
                                console.log(alltamanhos == tamanho);
                                console.log(alltamanhos.every(() => {
                                    return alltamanhos == tamanho;
                                }));
                                if (alltamanhos.every(() => {
                                    return alltamanhos != tamanho;
                                })) {
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
                                            console.log(tamanho == alltamanhosstring.tamanho);
                                            if (tamanho == alltamanhosstring.tamanho) {
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
