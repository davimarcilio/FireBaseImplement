function SetUser() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      let UserName = document.getElementById('UserName');
      let UserNasc = document.getElementById('UserNasc');
      let UserSex = document.getElementById('UserSex');
      let UserEmail = document.getElementById('UserEmail');
      const uid = user.uid;
      console.log(uid);
      db.collection("Usuários").where('uid_user', '==', uid).get().then((Snapshot) => {
        Snapshot.forEach((doc) => {
          const user = doc.data();
          UserName.innerText = `Nome: ${user.nome}`;
          UserNasc.innerText = `Nascimento: ${user.nascimento}`;
          user.sexo == 'F' ? UserSex.innerText = 'Sexo: Feminino' : UserSex.innerText = 'Sexo: Masculino';
          UserEmail.innerText = `Email: ${user.email}`;
        });
      });
    } else {
      setTimeout(() => {
        load('home');
      }, 2000);
    }
  });
}
function logOut() {
  auth.signOut().then(() => {
    toggleButtonCorrect(0)
    setTimeout(() => {
      ErrorCode('Deslogado com', 'Sucesso', 'Green');
    }, 300);
    setTimeout(() => {
      load('home');
    }, 3000);
  }).catch((err) => {
    toggleButtonError(0);
    setTimeout(() => {
      ErrorCode('Você já está deslogado', err, 'Red');
    }, 300);
    setTimeout(() => {
      load('home');
    }, 3000);
  });
}