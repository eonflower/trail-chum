import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom/';
import { UserContext } from '../../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Trail(props) {
  const { deleteTrail, trails } = useContext(UserContext)
  const { trailName, isFirst, isLast, id } = props;
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteTrail(id)
    .then(() => {
			navigate('/trails'); 
			window.location.reload();
		})
		.catch((error) => {
			console.error(error);
		});
  };

  return (
    <div className={`trail-container ${isFirst ? 'first-item' : ''} ${isLast ? 'last-item' : ''}`}>
			<span>
        <h2 className='trail-name'>{trailName}</h2>
			</span>
			<button className='trail-delete' onClick={() => handleDelete(id)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}