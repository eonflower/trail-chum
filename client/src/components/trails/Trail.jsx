import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Trail = (props) => {
  const { deleteTrail, trails } = useContext(UserContext)
  const { trailName, isFirst, isLast, id } = props;
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteTrail(id)
    navigate('/trails')
  };

  return (
    <div className={`trail-container ${isFirst ? 'first-item' : ''} ${isLast ? 'last-item' : ''}`}>
			<Link key={id} to={`/trails/${id}/logs`}>
        <span>
        <h2 className='trail-name'>{trailName}</h2>
			</span>
      </Link>
			<button className='trail-delete' onClick={() => handleDelete(id)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      
    </div>
  );
}

export default Trail;