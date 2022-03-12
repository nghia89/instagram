
import {
    getAuth,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';


const auth = getAuth();


export async function loginWithFacebook() {
    await Facebook.initializeAsync('<FACEBOOK_APP_ID>');

    const { type, token }: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
    });

    if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const facebookAuthProvider = new FacebookAuthProvider();
        const credential = facebookAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
        signInWithCredential(auth, credential).catch(error => {
            // Handle Errors here.
        });
    }
}