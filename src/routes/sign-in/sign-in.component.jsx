import { useEffect,useState  } from "react";
import { getRedirectResult,onAuthStateChanged } from "firebase/auth";

import {
	auth,
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect 
} from "../../utils/firebase/firebase.utils.js"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";


const SignIn = () =>{

	const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

	
	const logGoogleUser = async() =>{
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
		
		console.log(userDocRef)
	}

	const logGoogleRedirectUser = async() =>{
		const { user } = await signInWithGoogleRedirect();
		console.log({ user });
	}
	
	// Handle redirect result on component mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
				console.log(result)
        if (result) {
          // User successfully signed in
          const user = result.user;
          // You can now access user data and perform actions like redirecting
          console.log('User signed in:', user);
          // Example: Redirect to a dashboard
          // history.push('/dashboard'); // If using React Router
        }
      } catch (error) {
        // Handle errors during sign-in
        console.error('Error during Google sign-in redirect:', error);
      }
    };

    handleRedirectResult();
  }, []);


  return (
		<div>
			<h1>SignIn Page</h1>
			<button onClick={logGoogleUser}>
				Sign in with Google Popup
			</button>
			<button onClick={ signInWithGoogleRedirect }>
				Sign in with Google Redirect
			</button>
			<SignUpForm/>
		</div>
	)
}

export default SignIn

// Persist login state across reloads
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe(); // clean up listener
  // }, []);


	// useEffect(() => {	
  //   // Handle result after redirect
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result && result.user) {
  //         const user = result.user;
  //         console.log("User signed in:", user);
  //       }
  //     }).catch((error) => {
  //       console.error("Redirect error", error);
  //     });
  // }, []);

	// useEffect(() => {
  //   auth.onAuthStateChanged((userCredential) => {
  //     console.log({ userCredential });
  //   });
  // }, []);

	// useEffect(async ()=>{
	// 	const response = await getRedirectResult(auth);
	// 	if(response){
	// 		const userDocRef = await createUserDocumentFromAuth(response.user);
	// 	}
	// },[])
