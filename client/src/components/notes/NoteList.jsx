import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';

export default function NoteList(props) {
  const { notes, selectedTrailId } = props;

  const filteredNotes = selectedTrailId
    ? notes.filter((note) => note.trail === selectedTrailId)
    : notes;

		const sortedNotes = filteredNotes?.sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className='log-list'>
      {sortedNotes?.map((note, index) => (
        <Link key={note._id} to={`/notes/${note._id}`} className='note-link'>
        	<Note
            trail={note.trail}
            trailName={note.trailName}
            description={note.description}
						trailDirection={note.trailDirection}
            dayNumber={note.dayNumber}
            date={note.date}
						startLocation={note.startLocation}
						endLocation={note.endLocation}
            startMileMark={note.startMileMark}
            endMileMark={note.endMileMark}
            isFirst={index === 0}
            isLast={index === notes.length - 1}
          />
        </Link>
      ))}
    </div>
  );
}
