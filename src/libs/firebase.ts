import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDHuWwyslR_F_s4CA5FDkSsz06wfkS75vA",
    authDomain: "all-compta.firebaseapp.com",
    projectId: "all-compta",
    storageBucket: "all-compta.appspot.com",
    messagingSenderId: "165532928974",
    appId: "1:165532928974:web:1b5b6057d136ae4137f99f"
}

const app = initializeApp(firebaseConfig);

export default app;