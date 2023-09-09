// imports 
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, modifyContact, updateContact } from '../Redux/actions';

// ------------ universal popup to edit / create / view contacts based on which button is clicked and editable or not --------------------

const ContactPopup = () => {
    const dispatch = useDispatch();

    // -----------states for input--------------

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('active');

    // getting showPopup values from reducers to show popup as per req 

    const mdfyContact = useSelector((state) => state.contacts.showPopup);

    // to check its a popup for view or edit 

    const isViewPopup = mdfyContact.type === 'view';
    const isEditPopup = mdfyContact.type === 'edit';


    useEffect(() => {

        // if a view or edit req then put already existing data in inputs and disable

        if (isViewPopup || isEditPopup) {
            // Disable input fields and set values from mdfyContact.viewFor
            setFirstName(mdfyContact.viewFor.firstName);
            setLastName(mdfyContact.viewFor.lastName);
            setStatus(mdfyContact.viewFor.status);
        }

        else {
            // Reset input fields if it's not a view popup
            setFirstName('');
            setLastName('');
            setStatus('active');
        }
    }, [isEditPopup, isViewPopup, mdfyContact]);


    //------------ for saving contact -----------------

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isViewPopup && firstName && lastName) {
            const newContact = {
                firstName,
                lastName,
                status,
            };

            dispatch(addContact(newContact));
            setFirstName('');
            setLastName('');
            setStatus('active');
            //  and close popup 
            handleClsPopup();
        }
    };

    // --------------------------updating contact -----------------------

    const handleUpdate = (e) => {

        // preventing reload 

        e.preventDefault();

        if (!isViewPopup && firstName && lastName) {
            const updatedContact = {
                id: mdfyContact.viewFor.id,
                firstName,
                lastName,
                status,
            };
            console.log(updatedContact);
            dispatch(updateContact(updatedContact));
            setFirstName('');
            setLastName('');
            setStatus('active');

            //  and close popup 
            handleClsPopup();
        }
    }


    //   ------------------   closing popup ---------------------------

    const handleClsPopup = () => {
        dispatch(modifyContact({ type: '', status: false, viewFor: '' }));

    };


    return (
        <div className={`contactform  fixed w-[65vw] md:w-[84vw] text-center h-full backdrop-blur-[5px] flex justify-center items-center flex-col ${mdfyContact.status ? 'block' : 'hidden'}`}>
            <form onSubmit={isEditPopup ? handleUpdate : handleSubmit} className=' bg-white  rounded-md shadow-headcolor shadow-2xl pb-4'>
                {/* --------  close btn for popup ----------- */}
                <div className="popclos flex justify-end pr-[2%]">
                    <p className='cursor-pointer hover:text-lblue text-cardborder text-[1.4rem] font-[700] font-head' onClick={handleClsPopup}>X</p>
                </div>

                {/* -------------- input fields --------------- */}

                <div className="inputfields p-[1%] font-head text-sechead">
                    <div>
                        <label>First Name:</label>
                        <input
                            className='border-[1px] border-cardborder rounded-[4px] text-center'
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={isViewPopup}
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            className='border-[1px] border-cardborder rounded-[4px] text-center'
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={isViewPopup}
                        />
                    </div>
                    <div className='flex justify-center items-center mt-2'>
                        <div className='mr-1'>

                            <label>Status:</label>

                        </div>


                        <div className="optns flex flex-col gap-1 items-start">

                            <label>
                                <input
                                    className='border-[1px] border-cardborder rounded-[4px]'
                                    type="radio"
                                    value="active"
                                    checked={status === 'active'}
                                    onChange={() => setStatus('active')}
                                    disabled={isViewPopup}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    className='border-[1px] border-cardborder rounded-[4px]'
                                    type="radio"
                                    value="inactive"
                                    checked={status === 'inactive'}
                                    onChange={() => setStatus('inactive')}
                                    disabled={isViewPopup}
                                />
                                Inactive
                            </label>



                        </div>
                    </div>
                    {/* changing button action and text based on edit or create or view popup is this  */}

                    <button className={` btn ${isViewPopup? '!hidden' : ''} text-[0.7rem] mt-[2%] `} type="submit" >{isEditPopup ? 'Update' : 'Save Contact'}</button>

                </div>
            </form>
        </div>
    );
}

export default ContactPopup;
