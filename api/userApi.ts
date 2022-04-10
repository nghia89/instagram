
import {
    getAuth
} from 'firebase/auth';

import { getFirestore, collection, setDoc, doc, addDoc, query, where, getDocs, getDoc, Timestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../constants/Configs';
import uuid from 'react-native-uuid';


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


export async function AdPostData(body: Object) {
    var id = uuid.v4().toString();
    if (auth.currentUser?.uid && id) {

        await setDoc(doc(db, 'Posts', id), {
            ...body,
            id: id,
            uid: auth.currentUser?.uid,
            createAt: Timestamp.now()
        }).then((rsp) => { return rsp });
    } else
        return null;
}



