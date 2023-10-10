import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';

function firebaseInitialization() {
    initializeApp(firebaseConfig)
}

export default firebaseInitialization;