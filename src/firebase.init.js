import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfrXiyOVquaQwQ3URClJvz7-s8mvIfpzM",
  authDomain: "twitter-clone-c74e9.firebaseapp.com",
  projectId: "twitter-clone-c74e9",
  storageBucket: "twitter-clone-c74e9.appspot.com",
  messagingSenderId: "343141982483",
  appId: "1:343141982483:web:52f06c066dbe31c1a73ae6",
  measurementId: "G-XE1KSJZCS4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;