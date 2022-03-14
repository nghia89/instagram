
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

import { Alert } from 'react-native';
import { getFirestore, collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../constants/Configs';

initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth();

export interface IUser {
    email: string,
    password: string,
    fullName?: string,
}
export async function registration(user: IUser) {
    try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        const currentUser = auth.currentUser;
        if (currentUser?.uid) {
            await setDoc(doc(db, "users", currentUser.uid), {
                email: user.email,
                fullName: user.fullName,
            });
        }
    } catch (err: any) {
        console.log(err.message)
        Alert.alert("Thông báo", "Có lỗi xảy ra!");
    }
}

export async function signIn(user: IUser) {
    try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch (err: any) {
        console.log(err.message)
        Alert.alert("Thông báo", 'Tài khoản hoặc mật khẩu không đúng.');
    }
}

export async function loggingOut() {
    try {
        await signOut(auth);
    } catch (err: any) {
        console.log(err.message)
        Alert.alert("Thông báo", 'Có lỗi xảy ra!');
    }
}