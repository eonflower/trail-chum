import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  


  return (
    <div className='trail-notes-page'>
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className='trail-notes-container'>
      <h2 className='trail-notes-title'>{trailName} Notes</h2>
      <div className='log-list'>
      
      {notes?.map((note, index) => (
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
      ))}
    </div>
      </div>
    </div>
  );
}
