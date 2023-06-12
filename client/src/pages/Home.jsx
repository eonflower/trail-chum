import React, { useContext, useEffect, useState } from 'react'
import NoteList from '../components/notes/NoteList'
import { UserContext } from '../context/UserProvider'
import title from '../assets/logbook.png'


export default function Home() {
  const { notes, getAllNotes, trails, getTrailNotes } = useContext(UserContext);
  const [selectedTrail, setSelectedTrail] = useState('');

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleTrailChange = (event) => {
    const trailId = event.target.value;
    setSelectedTrail(trailId);

    if (trailId) {
      getTrailNotes(trailId);
    } else {
      getAllNotes();
    }
  };

  return (
    <div className='home-page'>
      <div className='home-container'>
        {/* <img className='home-title' src={title} alt='title that says logbook' /> */}
        <select 
					value={selectedTrail} 
					onChange={handleTrailChange}
					className='select-trail dropdown'>
          <option value=''>All Trails</option>
          {trails?.map((trail) => (
            <option key={trail._id} value={trail._id}>
              {trail.trailName}
            </option>
          ))}
        </select>
        <NoteList notes={notes} selectedTrailId={selectedTrail} />
      </div>
    </div>
  );
}



