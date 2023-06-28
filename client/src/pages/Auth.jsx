import React, {useState, useContext} from 'react'
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'
import logo from "../assets/trail-logo-brown.png"

const initInputs = {username: "", password: ""}

export default function Auth() {
	const [inputs, setinputs] = useState(initInputs)
	const [toggle, setToggle] = useState(false)
	

	const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

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
						errMsg={errMsg}
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
          <p className="member-btn" onClick={() => handleToggle()}>Click here to create new account</p>
        </>
      }
    </div>
		</div>
		</div>
  )
}