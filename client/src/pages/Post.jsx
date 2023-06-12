import React, { useContext, useEffect, useState } from 'react'
import NoteForm from '../components/notes/NoteForm'
import { UserContext } from '../context/UserProvider'


export default function Post() {
	const { addNote, trails, getAllTrails } = useContext(UserContext)

	useEffect(() => {
		getAllTrails()
	}, [])
	
	return (
		<div className='post-page'>
			<div className='post-container'>
			<h1 className='post-title'>daily log</h1>
				<div className='post-form-container'>
				<NoteForm addNote={addNote} trails={trails}/>
				</div>
			</div>
		</div>
	)
}
