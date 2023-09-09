// src/Chead.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { modifyContact } from '../Redux/actions';

// ---------------header for the contact sec to create contact ------------------

const Chead = () => {

  // ---------dispatch of redux to trigger popup show using modify --------------------

  const dispatch = useDispatch();

  // handling create contact using dispatch

  const handleCreateContactClick = () => {
    dispatch(modifyContact({ type: 'create', status: true, viewFor: '' })); 
  };

  return (
    <div className='flex justify-center items-center pt-8 '>

      <button
        className='btn  text-[0.7rem] mt-[1%]'
        type="button"
        onClick={handleCreateContactClick} // Dispatch popup for create
      >
        Create Contact
      </button>
    </div>
  );
}

export default Chead;
