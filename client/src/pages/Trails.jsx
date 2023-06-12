import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import TrailList from '../components/trails/TrailList'
import TrailForm from '../components/trails/TrailForm'

export default function Trails() {
	const { trails, addTrail, getAllTrails } = useContext(UserContext)

	useEffect(() => {
		getAllTrails()
	}, [])

	return (

		<div className='trail-page'>
			<div className='page-container'>
			<div className='trail-page-container'>
			{/* <h1 className='post-title'>your trails</h1> */}
				<TrailForm addTrail={addTrail}/>
				<TrailList trails={trails}/>
				</div>
			</div>
			</div>
	)
}
