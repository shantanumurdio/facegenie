import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const firebasedb = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const auth = getAuth(app);



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: "AIzaSyAsrDygmlAoJwetuEynQSsK0h2NGNiHWsg",
//   authDomain: "facegenie-4a05c.firebaseapp.com",
//   projectId: "facegenie-4a05c",
//   storageBucket: "facegenie-4a05c.appspot.com",
//   messagingSenderId: "113265204774",
//   appId: "1:113265204774:web:e7529ad134a7162ac890e7",
//   measurementId: "G-G2J8RDVZDK"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);