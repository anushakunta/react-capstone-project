import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth,signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
	email: "",
	password: "",
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	console.log(formFields);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	const signInWithGoogle = async() =>{
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await signInAuthWithEmailAndPassword(email,password);
			console.log(response)
		} catch (error) {
			switch(error.code){
				case 'auth/wrong-password':alert('incorrect password for email');break;
				case 'auth/user-not-found': alert('no user associated with this email'); break;
				case 'auth/invalid-credential': alert('invalid credentials'); break;
				default:console.log(error);
			}
		}
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	return (
		<div className="sign-up-container">
			<h2> Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

				<FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
				<div className="buttons-container">
					<Button type='submit' childeren='Sign In'>Sign In</Button>
					<Button type="button" buttonType = 'google' onClick={signInWithGoogle} childeren='Google Sign In'>Sign In</Button>
				</div>
			</form>
		</div>
	);

}

export default SignInForm;