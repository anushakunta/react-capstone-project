import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
//import { UserContext } from "../../context/user.context";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: ""
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	//const {setCurrentUser} = useContext(UserContext);

	//console.log(formFields);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("in handleSubmit");
		if (password !== confirmPassword) {
			alert("passwords do not match");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			switch(error.code){
				case 'auth/email-already-in-use':alert('incorrect password for email');break;
				case 'auth/user-not-found': alert('no user associated with this email'); break;
				case 'auth/invalid-credential': alert('invalid credentials'); break;
				default:console.log(error);
			}
			// if (error.code == 'auth/email-already-in-use') {
			// 	alert('Cannot create user, email already in use');
			// }
			console.log("sign-up form error", error)
		}
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	return (
		<div className="sign-up-container">
			<h2>Don't have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>

				<FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName} />

				<FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />

				<FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />

				<FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
				<Button type='submit' childeren='Sign Up'>Sign Up</Button>
			</form>
		</div>
	);

}

export default SignUpForm;