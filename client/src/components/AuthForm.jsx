import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText,
		errMsg,
    inputs: {
      username, 
      password
    } 
  } = props

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username"
				className='username'
        onChange={handleChange} 
        placeholder="Username"/>
				<br />
        <div className='password-btn-container'>
        <input 
        type={passwordShown ? "text" : "password"} 
        value={password} 
        name="password" 
				className='password'
        onChange={handleChange} 
        placeholder="Password"/>
        <p className='password-toggle' onClick={togglePassword}>{!passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</p>
        </div>
      
				<br />
      <button className='post-btn auth-btn'>{ btnText }</button>
			<p className="err-msg" style={{color: "#c1a748"}}>{errMsg}</p>
    </form>
  )
}