import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig";
import 'firebase/compat/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
