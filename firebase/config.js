// @ts-nocheck
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, getDocs, setDoc, doc, collection, query, where, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVU_yteFigeCuu1n3ean4iwBfdz4U2VEQ",
  authDomain: "washupmobilecarwash-7fb8c.firebaseapp.com",
  projectId: "washupmobilecarwash-7fb8c",
  storageBucket: "washupmobilecarwash-7fb8c.appspot.com",
  messagingSenderId: "619821503079",
  appId: "1:619821503079:web:f8c8a7343084a490a6fac2"
}

let app

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp()
}

const db = getFirestore()

const firebaseAuth = {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
}

const firebaseStore = {
  getDocs,
  setDoc,
  doc,
  db,
  collection,
  query,
  where,
  onSnapshot
}

export {
  firebaseAuth,
  firebaseStore
}