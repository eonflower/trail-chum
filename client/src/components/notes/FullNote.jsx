
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import NoteForm from './NoteForm';

export default function FullNote(props) {
  const { deleteNote, updateNote } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    description,
    trailName,
    trailDirection,
    startLocation,
    endLocation,
    startMileMark,
    endMileMark
  } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    deleteNote(id)
      .then(() => {
        navigate('/home'); // Redirect to the home page after successful deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const calculateMileage = () => {
    const startMile = parseFloat(startMileMark);
    const endMile = parseFloat(endMileMark);
    if (!isNaN(startMile) && !isNaN(endMile)) {
      const distance = Math.abs(endMile - startMile).toFixed(2);
      return distance !== '0.00' ? `${distance} miles` : '';
    }
    return '';
  };
  const mileage = calculateMileage();

  const handleEdit = () => {
    setIsEditMode(true);
  };
	

  return (
    <div>
      {isEditMode ? (
        <NoteForm
          noteId={id}
          formData={props}
					isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <>
          <span className='solo-span'>
            <h3 className='log-trail-solo'>{trailName}</h3>
            <p className='bullet'>|</p>
            <h3 className='log-mileage-solo'>{mileage === '' ? '0 miles' : mileage}</h3>
            <p className='bullet'>|</p>
            <h3 className='log-direction-solo'>{trailDirection}</h3>
          </span>
          <span className='log-location'>
            <h4 className='log-start-end'>
              {startLocation} {startLocation ? '-' : ''} {endLocation}
            </h4>
          </span>
          <p className='log-description'>{description}</p>
          <div className='button-container'>
            <button className='log-edit' onClick={() => handleEdit(id)}>
              Edit
            </button>
            <button className='log-delete' onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}