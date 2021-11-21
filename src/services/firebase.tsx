import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrV54oJIM0agz-WbQ5epUkCCQoQ6f-J7M",
  authDomain: "tarot-b3e06.firebaseapp.com",
  projectId: "tarot-b3e06",
  storageBucket: "tarot-b3e06.appspot.com",
  messagingSenderId: "472741955571",
  appId: "1:472741955571:web:26c8fcc9608d78a28af486",
  measurementId: "G-2RHRYPTBEH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const functions = getFunctions(app);
//connectFunctionsEmulator(functions, "localhost", 5001);
//connectFirestoreEmulator(db, "localhost", 8080);

const exportedObject = {
  db,
  app,
  functions,
};

export default exportedObject;
