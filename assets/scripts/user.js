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

          console.log(doc);
          console.log(doc.data());
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
  let incorrectX = document.querySelectorAll('.incorrect')[0];
  let buttonLogin = document.querySelectorAll('.button')[0];
  let correctImg = document.querySelectorAll('.correct')[0];
  auth.signOut().then(() => {
    buttonLogin.style.backgroundColor = '#44c98a';
    correctImg.style.display = 'inline'
    correctImg.style.opacity = '1';
    setTimeout(() => {
      greenErrorCode('Deslogado com', 'Sucesso');
    }, 400);
    setTimeout(() => {
      ResetErrorCode();
      load('home');
    }, 2000);
  }).catch((err) => {
    console.log(err);
    buttonLogin.style.backgroundColor = 'red';
    incorrectX.style.opacity = '1';
    incorrectX.style.display = 'inline';
    setTimeout(() => {
      ErrorCode('Você já está deslogado', '');
    }, 400);
    setTimeout(() => {
      ResetErrorCode();
      load('home');
    }, 2000);
  });
}
// function deleteUserLogged() {
//   let buttonLogin = document.querySelectorAll('.button')[1];
//   let correctImg = document.querySelectorAll('.correct')[1];
//   let incorrectX = document.querySelectorAll('.incorrect')[1];
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       var uid = user.uid;
//       auth.currentUser.delete().then(() => {
//         db.collection("Usuários").where('uid_user', '==', uid).get()
//           .then((Snapshot) => {
//             Snapshot.forEach((doc) => {
//               console.log(doc.id);
//               db.collection('Usuários').doc(doc.id).delete()
//                 .then(() => {
//                   buttonLogin.style.backgroundColor = '#44c98a';
//                   correctImg.style.display = 'inline'
//                   correctImg.style.opacity = '1';
//                   setTimeout(() => {
//                     ErrorCode('CONTA DELETADA', '');
//                   }, 400);
//                   setTimeout(() => {
//                     load('home');
//                   }, 2000);
//                 }).catch(() => {
//                   buttonLogin.style.backgroundColor = 'red';
//                   correctImg.style.display = 'none'
//                   correctImg.style.opacity = '0';
//                   incorrectX.style.opacity = '1';
//                   incorrectX.style.display = 'inline';
//                   setTimeout(() => {
//                     ErrorCode('Não foi possivel apagar a conta', '');
//                   }, 400);
//                   setTimeout(() => {
//                     load('home');
//                   }, 2000);
//                 })
//             })
//           }).catch((err) => {
//             console.log(err);
//           })

//       }).catch((err) => {
//         console.log(err);
//         buttonLogin.style.backgroundColor = 'red';
//         correctImg.style.display = 'none'
//         correctImg.style.opacity = '0';
//         incorrectX.style.opacity = '1';
//         incorrectX.style.display = 'inline';
//         setTimeout(() => {
//           ErrorCode('Não foi possivel apagar a conta', '');
//         }, 400);
//         setTimeout(() => {
//           load('home');
//         }, 2000);
//       })
//     } else {
//       setTimeout(() => {
//         load('home');
//       }, 2000);

//     }
//   })
// }