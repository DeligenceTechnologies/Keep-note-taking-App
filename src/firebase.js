
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTv1---U5-Kb4tOcwI0d81yrGEpr4Rww8",
  authDomain: "keep-clone-f178f.firebaseapp.com",
  projectId: "keep-clone-f178f",
  storageBucket: "keep-clone-f178f.appspot.com",
  messagingSenderId: "224607260920",
  appId: "1:224607260920:web:fdd19a98b6dd1fe5c12b0d",
  measurementId: "G-M27FSE58Z2"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app)
