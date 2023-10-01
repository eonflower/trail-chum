import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, Link} from "react-router-dom"
import NoteList from '../components/notes/NoteList'
import { UserContext } from '../context/UserProvider'
import logsImg from '../assets/logbook.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



export default function Logs() {
  const { notes, getAllNotes, getAllTrails, addTrail, trails, getTrailNotes } = useContext(UserContext);
  const [selectedTrail, setSelectedTrail] = useState('');
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1); // Takes the user back to the previous page
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
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className='logs-container'>
        {notes?.length === 0 ?
        <>
        <img className="notice-img" src={logsImg} alt='redirect message that says you have no logs'/>
        {trails?.length === 0 ?
        <Link className='add-log-btn' to="/trails">
        <button className='post-btn add-log-btn'>add a trail</button>
        </Link>
        :
        <Link className='add-log-btn' to="/post">
        <button className='post-btn add-log-btn'>add a log</button>
        </Link>}
        </>
        :
        <>{logs}</>}
      </div>
    </div>
  );
}



