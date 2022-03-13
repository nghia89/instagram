
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



const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app);

const auth = getAuth(app);

export interface IUser {
    email: string,
    password: string,
    fullName?: string,
}
export async function registration(user: IUser) {
    try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        const currentUser = auth.currentUser;

        // if (currentUser?.uid) {

        //     const ref = doc(firestore, "users", 'currentUser.uid');
        //     await setDoc(ref, {
        //         email: user.email,
        //         fullName: user.fullName,
        //     }).then((rsp) => console.log('rsp', rsp));
        // }
        if (currentUser?.uid) {
            const ref = collection(firestore, 'users');
            await addDoc(ref, {
                id: currentUser.uid,
                email: user.email,
                fullName: user.fullName,
            }).then((rsp) => console.log('rsp', rsp));
        }


    } catch (err: any) {
        console.log(err.message)
        Alert.alert("There is something wrong!!!!", err.message);
    }
}

export async function signIn(user: IUser) {
    try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch (err: any) {
        Alert.alert("Thông báo", 'Tài khoản hoặc mật khẩu không đúng.');
    }
}

export async function loggingOut() {
    try {
        await signOut(auth);
    } catch (err: any) {
        Alert.alert('There is something wrong!', err.message);
    }
}