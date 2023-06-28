import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logImg from "../assets/logs.png"

import Note from '../components/notes/Note';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function TrailNotes(props) {
  const { notes, getTrailNotes, trails } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailName, setTrailName] = useState('');

  useEffect(() => {
		getTrailNotes(id)
	}, [id])

  // Filter notes based on the selected trail id

  useEffect(() => {
    const trail = trails.find((trail) => trail._id === id);
    if (trail) {
      setTrailName(trail.trailName);
    }
  }, [id, trails]);


  const handleBack = () => {
    navigate(-1); // Takes the user back to the previous page
  };

  const logList =
  notes?.map((note, index) => (
    <Link key={note._id} to={`/notes/${note._id}`} className='note-link'>
    <Note
      key={note._id}
      trail={note.trail}
      trailName={note.trailName}
      trailDirection={note.trailDirection}
      description={note.description}
      dayNumber={note.dayNumber}
      date={note.date}
      startMileMark={note.startMileMark}
      endMileMark={note.endMileMark}
      isFirst={index === 0}
      isLast={index === notes.length - 1}
    />
    </Link>
  ))
  


  return (
    <div className='trail-notes-page'>
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className='trail-notes-container'>
      
      {notes.length === 0 ?
      <>
      <img className="notice-img" src={logImg} alt="" />
      <Link className='add-log-btn' to="/post">
        <button className='post-btn add-log-btn'>add log</button>
        </Link>
        </>
      :
      <>
      <h2 className='trail-notes-title'>{trailName} Logs</h2>
      <div className='log-list'>{logList}</div></>}
    </div>
    </div>
  );
}
