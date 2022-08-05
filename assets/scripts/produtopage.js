var tamanhoSelected;
var qtdselected;
var IntervalTimerLet;
var TimeoutTimerVar;
var timerNoti = 10;
console.log(tamanhoSelected);
function SetThisPage() {
    let allTamsarray = [];
    let ProdData = document.getElementById('ProdData');
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        prodVisibility = docUser.data().currentEdit;
                        db.collection('Categorias').where('doc_ID', '==', prodVisibility.prod_id_categ_edit).get()
                            .then((SnapShotCateg) => {
                                SnapShotCateg.forEach(docCateg => {
                                    ProdData.innerHTML = `  <h3>${docCateg.data().nome_categ} ${prodVisibility.prod_nome_edit} ${prodVisibility.prod_marca_edit}</h3>
                        <h4>Genero: ${prodVisibility.prod_gen_edit}</h4>
                        <h4>Marca: ${prodVisibility.prod_marca_edit}</h4>
                        <h2>Preço: R$${prodVisibility.prod_preco_edit}</h2>
                        <h6 id="Quantidade"></h6>
                        <div id="AllTams"></div>
                        <button onclick="SetCar(this)" class="bttcomprar" id="${prodVisibility.prod_id_edit}">Comprar</button>
                        `
                        let DescProd = document.getElementById('DescProd');
                        DescProd.innerHTML += `<p>${prodVisibility.prod_desc_edit}</p>`
                                    db.collection('Produtos').where('doc_ID', '==', prodVisibility.prod_id_edit).get()
                                        .then((SnapShotProd) => {
                                            SnapShotProd.forEach(docProd => {
                                                docProd.data().tamanhos.forEach(docProdTam => {
                                                    let quantidadeh6 = document.getElementById('Quantidade');
                                                    quantidadeh6.innerHTML = `
                                                         Selecione um tamanho`
                                                    allTamsarray.push(docProdTam.tamanho);
                                                });
                                                allTamsarray.sort()
                                                allTamsarray.forEach(alltamsarraysorted => {
                                                    let AllTams = document.getElementById('AllTams');
                                                    AllTams.innerHTML += `
                                                   <div class="tamanho" id="${alltamsarraysorted}" onclick="SelectTam(this)"><h5> ${alltamsarraysorted} </h5></div>`;
                                                });
                                            });
                                        })

                                });
                            }).catch((err) => {
                                console.log(err);
                            })

                    });
                })
        } else {
            load('home');
        }
    })
}
function SelectTam(element) {
    tamquery = document.querySelectorAll('.tamanho');
    tamquery.forEach(alltamquery => {
        alltamquery.style.backgroundColor = '';
    });
    tamanhoSelected = element.id;
    element.style.backgroundColor = 'Red';
    // 
    // 
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((SnapShotUser) => {
                    SnapShotUser.forEach(docUser => {
                        db.collection('Produtos').where('doc_ID', '==', prodVisibility.prod_id_edit).get()
                            .then((SnapShotProd) => {
                                SnapShotProd.forEach(docProd => {
                                    docProd.data().tamanhos.forEach(docProdTam => {
                                        if (tamanhoSelected == docProdTam.tamanho) {
                                            let quantidadeh6 = document.getElementById('Quantidade');
                                            quantidadeh6.innerHTML = `
                                                         Quantidade ${docProdTam.quantidade}`
                                        }
                                    });
                                });
                            })
                    });
                })
        } else {
            load('home');
        }
    })
}
function SetCar(element) {
    console.log(element.id);
    timerNoti = 10;
    clearInterval(IntervalTimerLet);
    clearTimeout(TimeoutTimerVar);
    auth.onAuthStateChanged((user) => {
        if (user) {
            if (tamanhoSelected != undefined) {


                db.collection('Usuários').where('uid_user', '==', user.uid).get()
                    .then((Snapshot) => {
                        Snapshot.forEach((doc) => {
                            db.collection('Produtos').where('doc_ID', '==', element.id).get()
                                .then((SnapShotProd) => {
                                    SnapShotProd.forEach((docProd) => {
                                        db.collection('Usuários').doc(doc.id).get()
                                        .then((docUserTamDelete) => {
                                            docUserTamDelete.data().carrinho.forEach(filtredcar => {
                                                db.collection('Usuários').doc(doc.id).update({
                                                    carrinho: firebase.firestore.FieldValue.arrayRemove({
                                                        prod_id_car: element.id,
                                                        prod_qtd_car: 1,
                                                        prod_categ_id_car: docProd.data().id_categ,
                                                        prod_nome_car: docProd.data().nome_prod,
                                                        prod_marca_car: docProd.data().marca_prod,
                                                        prod_preco_car: docProd.data().preco_prod,
                                                        prod_tamanho_car: filtredcar.prod_tamanho_car,
                                                        prod_desc_car: docProd.data().desc_prod,
                                                    }),
                                                });
                                            });

                                        })
                                        .then(() => {
                                            db.collection('Usuários').doc(doc.id).update({
                                                carrinho: firebase.firestore.FieldValue.arrayUnion({
                                                    prod_id_car: element.id,
                                                    prod_qtd_car: 1,
                                                    prod_categ_id_car: docProd.data().id_categ,
                                                    prod_nome_car: docProd.data().nome_prod,
                                                    prod_marca_car: docProd.data().marca_prod,
                                                    prod_preco_car: docProd.data().preco_prod,
                                                    prod_tamanho_car: tamanhoSelected,
                                                    prod_desc_car: docProd.data().desc_prod,
                                                }),
                                            })
                                        })
                                    })
                                })
                            let Notification = document.getElementById('Notification');
                            Notification.style.display = 'flex';
                            let timerNotiH5 = document.getElementById('timerNoti');
                            timerNotiH5.innerHTML = `${timerNoti} S`;
                            IntervalTimerLet = setInterval(IntervalTimer, 1000);
                            TimeoutTimerVar = setTimeout(() => {
                                clearInterval(IntervalTimerLet);
                                Notification.style.display = 'none';
                            }, 11000);
                        });
                    }).catch((err) => {
                        console.log(err);
                    })
            } else {
                console.log('Selecione um tamanho');
            }
        } else {
            load('login');
        }
    })
}
function IntervalTimer() {
    let timerNotiH5 = document.getElementById('timerNoti');
    timerNotiH5.innerHTML = `${timerNoti} S`;
    timerNoti--;
}
function ContinuarProd() {
    let Notification = document.getElementById('Notification');
    clearInterval(IntervalTimerLet);
    clearTimeout(TimeoutTimerVar);
    Notification.style.display = 'none';
}