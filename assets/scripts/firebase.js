const firebaseConfig = {
    apiKey: "AIzaSyDeseWdp9IleZhxVA9LQuQ7gGUsVnqwKMs",
    authDomain: "progranadorbr.firebaseapp.com",
    projectId: "progranadorbr",
    storageBucket: "progranadorbr.appspot.com",
    messagingSenderId: "919540356070",
    appId: "1:919540356070:web:f19d6f00022b3d7e2f3c27",
    measurementId: "G-Q2Q2TPSW9Y"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();