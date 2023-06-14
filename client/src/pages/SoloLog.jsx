
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import FullNote from '../components/notes/FullNote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { format, addDays } from 'date-fns';

export default function SoloLog() {
  const { id } = useParams();
	const navigate = useNavigate();
  const { getSoloNote, notes } = useContext(UserContext);

  useEffect(() => {
    getSoloNote(id);
  }, [id]);

  // Find the note with the matching id from the notes array
  const note = notes.find((note) => note._id === id);

	const handleBack = () => {
    navigate(-1); // Takes the user back to the previous page
  };

	if (!note) {
    return <p>loading... </p>; // Render a loading message if note is undefined
  }

  const correctDate = addDays(new Date(note.date), 1)

	const formattedDate = format(new Date(correctDate), 'MMMM do, yyyy')


	
  return (
    <div className='solo-page'>
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className='solo-container'>
        <h2 className='solo-title'>Day {note.dayNumber} | {formattedDate}</h2>
        <div className='solo-note'>
          <FullNote
            key={note._id}
            trail={note.trail}
            trailName={note.trailName}
            description={note.description}
            dayNumber={note.dayNumber}
            date={note.date}
            trailDirection={note.trailDirection}
            startMileMark={note.startMileMark}
            endMileMark={note.endMileMark}
            startLocation={note.startLocation}
            endLocation={note.endLocation}
          />
        </div>
      </div>
    </div>
  );
}






