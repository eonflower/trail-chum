import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import IndividualLog from '../components/logs/IndividualLog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { format, addDays } from 'date-fns';

const SoloLog = () => {
  const { id } = useParams();
	const navigate = useNavigate();
  const { getSoloLog, logs } = useContext(UserContext);

  useEffect(() => {
    getSoloLog(id);
    // console.log(logs);
  }, [id]);

  // Find the Log with the matching id from the Logs array
  const soloLog = logs?.find((log) => log._id === id);

	const handleBack = () => {
    navigate(-1); // Takes the user back to the previous page
  };

	if (!soloLog) {
    return <p>loading... </p>; // Render a loading message if Log is undefined
  }

  const correctDate = addDays(new Date(soloLog?.date), 1)

	const formattedDate = format(new Date(correctDate), 'MMMM do, yyyy')


	
  return (
    <div className='solo-page'>
      <button onClick={handleBack} className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <div className='solo-container'>
        <h2 className='solo-title'>
          {soloLog?.dayNumber === null ? "" :`Day ${soloLog.dayNumber} | `}{formattedDate}
        </h2>
        <div className='solo-log'>
          <IndividualLog
            key={soloLog._id}
            trail={soloLog.trail}
            trailName={soloLog.trailName}
            description={soloLog.description}
            dayNumber={soloLog.dayNumber}
            date={soloLog.date}
            trailDirection={soloLog.trailDirection}
            startMileMark={soloLog.startMileMark}
            endMileMark={soloLog.endMileMark}
            startLocation={soloLog.startLocation}
            endLocation={soloLog.endLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default SoloLog;


