import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsForm from '../components/SettingsForm'
import { UserContext } from '../context/UserProvider'


function AccountSettings() {
	const {user, errMsg, deleteUser, getUser} = useContext(UserContext)
	const [validationErr, setValidationErr] = useState(errMsg)
	const navigate = useNavigate()

	useEffect(() => {
		getUser(user._id)
		setValidationErr(errMsg)
	}, [errMsg])

	const handleDelete = () => {
		deleteUser(user._id)
	}

	return (
		<div className='account-page'>
			<div className='account-layout'>
				<div className='account-page-container'>
				<h1 className='account-title'>Your Account</h1>
					<SettingsForm
						username={user.username}
						password={user.password}
						email={user.email}
						deleteUser={handleDelete}
						errMsg={validationErr}/>
				</div>
			</div>
		</div>
	)
}

export default AccountSettings