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
                                if (alltamanhos.every(elem => elem != tamanho) ) {
                                    db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).update({
                                        tamanhos: firebase.firestore.FieldValue.arrayUnion({
                                            tamanho: tamanho,
                                            quantidade: parseInt(quantidade),
                                        })
                                    }).then(() => {
                                        toggleButtonCorrect(0);
                                        setTimeout(()=>{
                                            load('tamanhoAdmin');
                                        },500);
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
                                            .then((docProd) => {
                                                docProd.data().tamanhos.forEach(alltamanhosstring => {
                                                    if ((tamanho == alltamanhosstring.tamanho) && (alltamanhosstring.quantidade != quantidade)) {
                                                        db.collection('Produtos').doc(docUser.data().currentEdit.prod_id_edit).update({
                                                            tamanhos: firebase.firestore.FieldValue.arrayRemove({
                                                                tamanho: tamanho,
                                                                quantidade: alltamanhosstring.quantidade,
                                                            })
                                                        }).then(()=>{
                                                            toggleButtonCorrect(0);
                                                            setInterval(() => {
                                                               load('tamanhoAdmin'); 
                                                            }, 500);
                                                            
                                                        })
                                                    }
                                                });
                                            })
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }
                            }).catch((err)=>{
                                console.log(err);
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
                            }).catch((err)=>{
                                console.log(err);
                            })
                    });
                }).catch((err)=>{
                    console.log(err);
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
                                if (TamCadastrados == 0) {
                                        tamanho.value = '';
                                        quantidade.value = '';
                                        tamanho.disabled = true;
                                    }
                                    if (TamCadastrados == 1) {
                                        tamanho.value = '';
                                        quantidade.value = '';
                                        tamanho.disabled = false;
                                    }
                                docProd.data().tamanhos.forEach(tamanhosProd => {
                                    
                                    if (tamanhosProd.tamanho == TamCadastrados) {
                                        tamanho.disabled = true;
                                        tamanho.value = tamanhosProd.tamanho;
                                        quantidade.value = tamanhosProd.quantidade;
                                    }
                                });
                            }).catch((err)=>{
                                console.log(err);
                            })
                    });
                }).catch((err)=>{
                    console.log(err);
                })
        }
    })
}