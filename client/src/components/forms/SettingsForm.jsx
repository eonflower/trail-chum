import React from 'react';

function SettingsForm(props) {

  const {
    deleteUser,
		username, 
		email,
  } = props;

  return (
    <form className="account-form" onSubmit={deleteUser}>
      <h3>Username</h3>
			<p>{username}</p>
			<br />
			<h3>Email</h3>
			<p>{email}</p>
			<br />
      <button className="post-btn auth-btn">Delete Account</button>
    </form>
  );
}

export default SettingsForm;
