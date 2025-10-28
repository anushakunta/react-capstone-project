import { useEffect,useState  } from "react";
import { getRedirectResult,onAuthStateChanged } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";

import {AuthenticationContainer} from './authentication.styles';

const Authentication = () =>{

	const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

	
	// const logGoogleUser = async() =>{
	// 	const { user } = await signInWithGooglePopup();
	// 	const userDocRef = await createUserDocumentFromAuth(user);
		
	// 	console.log(userDocRef)
	// }

	// const logGoogleRedirectUser = async() =>{
	// 	const { user } = await signInWithGoogleRedirect();
	// 	console.log({ user });
	// }
	
	// // Handle redirect result on component mount
  // useEffect(() => {
  //   const handleRedirectResult = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
	// 			console.log(result)
  //       if (result) {
  //         // User successfully signed in
  //         const user = result.user;
  //         // You can now access user data and perform actions like redirecting
  //         console.log('User signed in:', user);
  //         // Example: Redirect to a dashboard
  //         // history.push('/dashboard'); // If using React Router
  //       }
  //     } catch (error) {
  //       // Handle errors during sign-in
  //       console.error('Error during Google sign-in redirect:', error);
  //     }
  //   };

  //   handleRedirectResult();
  // }, []);


  return (
		<AuthenticationContainer>
			{/* <button onClick={logGoogleUser}>
				Sign in with Google Popup
			</button>
			<button onClick={ signInWithGoogleRedirect }>
				Sign in with Google Redirect
			</button> */}
      <SignInForm/>
			<SignUpForm/>
		</AuthenticationContainer>
	)
}

export default Authentication

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
