import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NoteForm from '../components/notes/NoteForm'
import { UserContext } from '../context/UserProvider'
import logImg from "../assets/log.png"


export default function Post() {
	const { addNote, trails, getAllTrails } = useContext(UserContext)

	useEffect(() => {
		getAllTrails()
	}, [])
	
	return (
		<div className='post-page'>
				{trails?.length === 0 ? (
            <div>
              <img className="notice-img" src={logImg} alt='redirect message that says you need to create a trail'/>
              <Link className='add-log-btn' to="/trails">
								<button className='post-btn add-log-btn'>add a trail</button>
							</Link>
            </div>
          ) : (
						<div className='post-container'>
						<h1 className='post-title'>daily log</h1>
						<div className='post-form-container'>
            <NoteForm addNote={addNote} trails={trails} />
						</div>
						</div>
          )}
		</div>
	)
}
