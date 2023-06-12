import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Trail from "./Trail";
import { UserContext } from '../../context/UserProvider';

export default function TrailList() {
  const { trails, deleteTrail } = useContext(UserContext);

  return (
    <div className='log-list'>
      {trails?.map((trail, index) => (
        <Link key={trail._id} to={`/trails/${trail._id}/notes`}>
          <Trail
            id={trail._id}
            key={trail._id}
            trailName={trail.trailName}
            isFirst={index === 0}
            isLast={index === trails.length - 1}
            deleteTrail={deleteTrail}
          />
        </Link>
      ))}
    </div>
  );
}
