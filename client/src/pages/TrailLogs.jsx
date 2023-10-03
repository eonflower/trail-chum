import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logImg from "../assets/logs.png"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ListedLogItem from '../components/trailLogs/ListedLogItem';

const TrailLogs = (props) => {
  const { logs, getTrailLogs, selectedTrailId, trails } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailName, setTrailName] = useState('');

  useEffect(() => {
		getTrailLogs(id)
	}, [id])

  const filteredLogs = selectedTrailId
    ? logs.filter((log) => log.trail === selectedTrailId)
    : logs;

		const sortedLogs = filteredLogs?.sort((a, b) => a.dayNumber - b.dayNumber);

  // Filter Logs based on the selected trail id
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
  sortedLogs?.map((log, index) => (
    <Link key={log._id} to={`/logs/${log._id}`} className='log-link'>
    <ListedLogItem
      key={log._id}
      trail={log.trail}
      trailName={log.trailName}
      trailDirection={log.trailDirection}
      description={log.description}
      dayNumber={log.dayNumber}
      date={log.date}
      startMileMark={log.startMileMark}
      endMileMark={log.endMileMark}
      isFirst={index === 0}
      isLast={index === logs.length - 1}
    />
    </Link>
  ))
  


  return (
    <div className='trail-logs-page'>
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className='trail-logs-container'>
      
      {logs?.length === 0 ?
      <>
      <img className="notice-img" src={logImg} alt="" />
      <Link className='add-log-btn' to="/post">
        <button className='post-btn add-log-btn'>add log</button>
        </Link>
        </>
      :
      <>
      <h2 className='trail-logs-title'>{trailName} Logs</h2>
      <div className='log-list'>{logList}</div></>}
    </div>
    </div>
  );
}

export default TrailLogs