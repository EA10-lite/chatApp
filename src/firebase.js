import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyXQ9phagQ7k3ncAIG7FbLPiMndbxaVRY",
  authDomain: "slack-clone-ea8.firebaseapp.com",
  projectId: "slack-clone-ea8",
  storageBucket: "slack-clone-ea8.appspot.com",
  messagingSenderId: "824861611250",
  appId: "1:824861611250:web:bca4244022219e9f452c6b",
  measurementId: "G-D5213TTC3D"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, auth, provider};