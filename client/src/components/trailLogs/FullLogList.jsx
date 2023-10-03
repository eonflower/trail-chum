import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Log from './ListedLogItem';

const FullLogList = (props) => {
  const { logs, selectedTrailId } = props;

  const filteredLogs = selectedTrailId
    ? logs.filter((log) => log.trail === selectedTrailId)
    : logs;

		const sortedLogs = filteredLogs?.sort((a, b) => a.dayNumber - b.dayNumber);

  return (
    <div className='log-list'>
      {sortedLogs?.map((log, index) => (
        <Link key={log._id} to={`/logs/${log._id}`} className='log-link'>
        	<Log
            trail={log.trail}
            trailName={log.trailName}
            description={log.description}
						trailDirection={log.trailDirection}
            dayNumber={log.dayNumber}
            date={log.date}
						startLocation={log.startLocation}
						endLocation={log.endLocation}
            startMileMark={log.startMileMark}
            endMileMark={log.endMileMark}
            isFirst={index === 0}
            isLast={index === logs.length - 1}
          />
        </Link>
      ))}
    </div>
  );
}

export default FullLogList;