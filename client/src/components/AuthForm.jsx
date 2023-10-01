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
      password,
      email
    } ,
    isSignUp,
  } = props

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {isSignUp && (
        <>
        <input
          type="email"
          value={email}
          name="email"
          aria-label='email'
          className="email"
          onChange={handleChange}
          placeholder="email"
        />
        <br />
        </>
      )}
      <input
        type="text"
        value={username}
        name="username"
        aria-label='username'
        label="username"
        className="username"
        onChange={handleChange}
        placeholder="username"
      />
				<br />
        <div className='password-btn-container'>
        <input 
          type={passwordShown ? "text" : "password"} 
          value={password} 
          name="password" 
          aria-label='password'
          label="password"
          className='password'
          onChange={handleChange} 
          placeholder="password"/>
        <p className='password-toggle' onClick={togglePassword}>{!passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</p>
        </div>
      
				<br />
      <button className='post-btn auth-btn'>{ btnText }</button>
			<p className="err-msg" style={{color: "#c1a748"}}>{errMsg}</p>
    </form>
  )
}