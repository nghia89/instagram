
import {
    getAuth
} from 'firebase/auth';

import { Alert } from 'react-native';
import { getFirestore, collection, setDoc, doc, addDoc, query, where, getDocs, limitToLast, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../constants/Configs';

initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth();
const userRef = collection(db, "users");



export async function getUserAuth() {
    let _user = null
    if (auth.currentUser?.uid) {
        const q = query(userRef, where("id", "==", auth.currentUser?.uid));
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            _user = doc.data();
        });
    }
    return _user;
}

