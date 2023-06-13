import React from 'react'

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
      <input 
        type="password" 
        value={password} 
        name="password" 
				className='password'
        onChange={handleChange} 
        placeholder="Password"/>
				<br />
      <button className='post-btn auth-btn'>{ btnText }</button>
			<p style={{color: "#c1a748"}}>{errMsg}</p>
    </form>
  )
}