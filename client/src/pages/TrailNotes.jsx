import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import Note from '../components/notes/Note';

export default function TrailNotes(props) {
  const { notes, getTrailNotes, trails } = useContext(UserContext);
  const { id } = useParams();
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

  


  return (
    <div className='trail-notes-page'>
      <div className='trail-notes-container'>
      <h2 className='trail-notes-title'>{trailName} Notes</h2>
      <div className='log-list'>
      {notes?.map((note, index) => (
        <Note
          key={note._id}
          trail={note.trail}
          trailName={note.trailName}
          description={note.description}
          dayNumber={note.dayNumber}
          date={note.date}
          startMileMark={note.startMileMark}
          endMileMark={note.endMileMark}
          isFirst={index === 0}
          isLast={index === notes.length - 1}
        />
      ))}
    </div>
      </div>
    </div>
  );
}
