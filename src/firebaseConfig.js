import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBOyd6sJrGdBL5mPxG-dOlmqr1PmXZnz5U",
    authDomain: "uygulama-8e4f5.firebaseapp.com",
    projectId: "uygulama-8e4f5",
    storageBucket: "uygulama-8e4f5.appspot.com",
    messagingSenderId: "407675372471",
    appId: "1:407675372471:web:487628ba62e8c1e6a99e32",
    measurementId: "G-3E5JKEVTNN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };