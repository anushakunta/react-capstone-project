import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAMuzJaiHMofBW85_hqXY3byNovi-IncL0",
    authDomain: "chansa-db-69aae.firebaseapp.com",
    projectId: "chansa-db-69aae",
    storageBucket: "chansa-db-69aae.firebasestorage.app",
    messagingSenderId: "927220427305",
    appId: "1:927220427305:web:4b4a1178b06ff96904ca38"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth =  getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const signInWithGoogleRedirect =  async () => {
    try {
        debugger;
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error initiating Google sign-in:', error);
    }
  };

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
    if(!userAuth) return;

    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot)
    //console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email,password)=>{
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthWithEmailAndPassword = async(email,password)=>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);