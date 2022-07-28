function SetUser() {
    

auth.onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log(uid);
      db.collection("Usuários").where('uid_user', '==', uid).get().then((Snapshot) => {
        Snapshot.forEach((doc) => {
            console.log(doc);
            console.log(doc.data());
        });
    });

    } else {



    }
  });
}