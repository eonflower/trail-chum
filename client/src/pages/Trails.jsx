import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import TrailList from '../components/trails/TrailList'
import TrailForm from '../components/forms/TrailForm'
import trailImg from "../assets/trails.png"

export default function Trails() {
	const { trails, addTrail, getAllTrails } = useContext(UserContext)

	useEffect(() => {
		getAllTrails()
	}, [])

	return (

		<div className='trail-page'>
			<div className='page-container'>
			<div className='trail-page-container'>
			<TrailForm addTrail={addTrail}/>
				{trails?.length === 0 ?
				<img className="notice-img" src={trailImg} alt="redirect message that says you have no trails yet" />
				:
				<TrailList trails={trails}/>}
				
				</div>
			</div>
			</div>
	)
}
