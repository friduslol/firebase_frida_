import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGg1cOE110P_VYAZYrfoRAX4pscXQjO0k",
  authDomain: "fir-frida-328d8.firebaseapp.com",
  projectId: "fir-frida-328d8",
  storageBucket: "fir-frida-328d8.appspot.com",
  messagingSenderId: "824154391880",
  appId: "1:824154391880:web:713da236c5446fe38fdf7d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

// firebase firestore instance
const fireStore = getFirestore(app)

// storage instance
const storage = getStorage(app)

export {
  app as default,
  auth,
  fireStore,
  storage
}
