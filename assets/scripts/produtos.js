function VisualizeProds(docProdData) {
    let produtos = document.getElementById('produtosGrid');
    produtos.innerHTML +=
        `<div class="produto" id="produto">
   <img class="imgProd" src="" alt="Foto do produto">
   <h3 class="nomeProd" id="nomeProd">${docProdData.nome_prod} ${docProdData.marca_prod}</h3>
   <h4 class="precoProd" id="precoProd">R$${docProdData.preco_prod}</h4>
   <button onclick="SetCar(this)" class="bttcomprar" id="${docProdData.doc_ID}" name="bttcomprar" type="button">Comprar</button>
   </div>
   `;

}
function SetPageProdutos() {
    db.collection('Categorias').get()
        .then((Snapshot) => {
            Snapshot.forEach((docCateg) => {
                let categorias = docCateg.data();
                let categoriaFilter = document.getElementById('filtrarid');
                categoriaFilter.innerHTML += `<option value="${docCateg.id}">${categorias.nome_categ}</option>`;
                PesqFilter();
            });
        }).catch((err) => {
            console.log(err);
        });
}
function PesqFilter() {
    let produtos = document.getElementById('produtosGrid');
    let Filterid = document.getElementById('filtrarid').value;
    let pesqInput = document.getElementById('pesquisar');
    pesqInput.value = '';
    if (Filterid != '0') {
        db.collection('Produtos').where('id_categ', '==', Filterid).get().then((Snapshot) => {
            produtos.innerHTML = '';
            Snapshot.forEach((docProd) => {
                let docProdData = docProd.data();
                VisualizeProds(docProdData);
            });
        }).catch((err) => {
            console.log(err);
        });
    } else {
        db.collection('Produtos').get().then((Snapshot) => {
            produtos.innerHTML = '';
            Snapshot.forEach((docProd) => {
                let docProdData = docProd.data();
                VisualizeProds(docProdData);
            });
        }).catch((err) => {
            console.log(err);;
        })
    }
}
function SetCar(element) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('Usuários').where('uid_user', '==', user.uid).get()
                .then((Snapshot) => {
                    Snapshot.forEach((doc) => {
                        db.collection('Produtos').where('doc_ID', '==', element.id).get()
                            .then((SnapShotProd) => {
                                SnapShotProd.forEach((docProd) => {
                                    db.collection('Usuários').doc(doc.id).update({
                                        carrinho: firebase.firestore.FieldValue.arrayUnion({
                                            prod_id_car: element.id,
                                            prod_qtd_car: 1,
                                            prod_nome_car: docProd.data().nome_prod,
                                            prod_preco_car: docProd.data().preco_prod,
                                            prod_tamanho_car: docProd.data().tam_prod,
                                            prod_desc_car: docProd.data().desc_prod,
                                        }),
                                    })
                                })
                            })
                        let Notification = document.getElementById('Notification');
                        Notification.style.display = 'flex';
                        timerNotiH5.innerHTML = `${timerNoti} S`;
                        setInterval(IntervalTimer, 1000);
                        setTimeout(() => {
                            clearInterval(IntervalTimer);
                            Notification.style.display = 'none';
                        }, 11000);
                    });
                }).catch((err) => {
                    ErrorCode('Erro', err, 'Red');
                })
        } else {
            load('login');
        }
    })
}
function IntervalTimer() {
    let timerNoti = 10;
    let timerNotiH5 = document.getElementById('timerNoti');
    timerNotiH5.innerHTML = `${timerNoti} S`;
    timerNoti--;
}
function search() {
    let produtos = document.getElementById('produtosGrid');
    let pesqInput = document.getElementById('pesquisar').value.toUpperCase();
    let searchError = document.querySelector('.search0');
    let marcapesq = 0;
    let nomepesq = 0;
    db.collection('Produtos').orderBy('nome_prod').startAt(pesqInput).endAt(pesqInput + '\uf8ff').get()
        .then((Snapshot) => {
            produtos.innerHTML = '';
            if (Snapshot.docs.length <= 0 && marcapesq <= 0) {
                searchError.style.display = 'flex';
            } else {
                nomepesq = 1;
                searchError.style.display = 'none';
                Snapshot.forEach((docProd) => {
                    docProdData = docProd.data();
                    VisualizeProds(docProdData);
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    db.collection('Produtos').orderBy('marca_prod').startAt(pesqInput).endAt(pesqInput + '\uf8ff').get()
        .then((Snapshot) => {
            if (Snapshot.docs.length <= 0 && nomepesq <= 0) {
                searchError.style.display = 'flex';

            } else {
                marcapesq = 1;
                searchError.style.display = 'none';
                Snapshot.forEach((docProd) => {
                    docProdData = docProd.data();
                    VisualizeProds(docProdData);
                });
            }
        }).catch((err) => {
            console.log(err);
        })
}
function ContinuarProd() {
    let Notification = document.getElementById('Notification');
    clearInterval(IntervalTimer);
    Notification.style.display = 'none';
}