import React, { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import NoteList from '../components/notes/NoteList'
import { UserContext } from '../context/UserProvider'
import logsImg from '../assets/logbook.png'



export default function Logs() {
  const { notes, getAllNotes, getAllTrails, trails, getTrailNotes } = useContext(UserContext);
  const [selectedTrail, setSelectedTrail] = useState('');

  useEffect(() => {
    getAllNotes()
    getAllTrails()
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

  const logs =
  <>
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
        <NoteList notes={notes} selectedTrailId={selectedTrail} /></>

  return (
    <div className='logs-page'>
      <div className='logs-container'>
        {notes.length === 0 ?
        <>
        <img className="notice-img" src={logsImg} alt=''/>
        <Link className='add-log-btn' to="/post">
        <button className='post-btn add-log-btn'>add log</button>
        </Link>
        </>
        
        :
        <>{logs}</>}
      </div>
    </div>
  );
}



