
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
const postsRef = collection(db, "posts");



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
    if (auth.currentUser?.uid) {
        await addDoc(postsRef, {
            ...body,
            uid: auth.currentUser?.uid,
            createAt: Timestamp.now()
        }).then((rsp) => { return rsp });
    } else
        return null;
}

export async function GetUserPosts() {
    let _data: any[] = []
    if (auth.currentUser?.uid) {
        const q = query(postsRef, where("uid", "==", auth.currentUser.uid))
        const _query = await getDocs(q);
        _query.forEach((doc) => {
            _data.push(doc.data());
        })
    }
    return _data;
}


export async function GetPostsDoc(id: string) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().data;
    } else {
        console.log("No such document!");
        return null;
    }
}