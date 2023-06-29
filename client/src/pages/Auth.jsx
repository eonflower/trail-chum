import React, {useState, useContext} from 'react'
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'
import logo from "../assets/trail-logo-brown.png"

const initInputs = {username: "", password: ""}

export default function Auth() {
	const [inputs, setinputs] = useState(initInputs)
	const [toggle, setToggle] = useState(false)
	
	

	const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)
	const [validationErr, setValidationErr] = useState(errMsg)
	const handleChange = (e) => {
		const {name, value} = e.target
		setinputs(prevInputs => ({
			...prevInputs,
			[name]: value
		}))
	}

	const handleSignup = (e) => {
		e.preventDefault()
		signup(inputs)
		if (errMsg === "User validation failed: username: Please enter a username"){
			setValidationErr("Please enter a username")
			} else if (errMsg === "User validation failed: password: Please enter a password") {
			setValidationErr("Please enter a password")
			} else if (errMsg === "User validation failed: username: Please enter a username, password: Please enter a password") {
				setValidationErr("Username & password required")
			} else {
				setValidationErr(errMsg)
			}
	}

	const handleLogin = (e) => {
		e.preventDefault()
		login(inputs)
	}

	const handleToggle = () => {
		setToggle(prev => !prev)
		resetAuthErr()
	}

	
	
  return (
    <div className='auth'>
			<img className="auth-logo" src={logo} alt='logo' />
		<div className='auth-layout'>
			<div className="auth-container">
				
			
      { toggle ?
        <>
				<h1 className='auth-title'>Create Account</h1>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
						errMsg={validationErr}
          />
          <p className="member-btn" onClick={() => handleToggle()}>Already a member?</p>
        </>
      :
        <>
				<h1 className='auth-title'>Sign in</h1>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
						errMsg={errMsg}
          />
          <p className="member-btn" onClick={() => handleToggle()}>Not a member?</p>
        </>
      }
    </div>
		</div>
		</div>
  )
}