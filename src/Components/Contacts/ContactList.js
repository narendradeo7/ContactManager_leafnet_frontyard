// imports 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, modifyContact } from '../Redux/actions';


const ContactList = () => {
    // dispatch for passing value of state 
    const dispatch = useDispatch();


    // accessing contacts from reducers using useSelector 

    const { contacts } = useSelector((state) => state.contacts);


    // -------------to handle view details ---------------

    const handleViewdetails = (contact) => {
        dispatch(modifyContact({ type: 'view', status: true, viewFor: contact }))
    }

    // ------------for edit details ----------------------
    const handleEditdetails = (contact) => {

        dispatch(modifyContact({ type: 'edit', status: true, viewFor: contact }))

    }

    // --------------delete details -------------------------

    const handleDeletedetails = (contact) => {



        dispatch(deleteContact(contact));

    }


    return (
        <div className='cntactlistsec pb-[2%] mt-[2%] border-[1px] border-cardborder '>
            <h2 className='text-sechead font-head text-[2.2rem] text-center mt-[1%]'>All Contacts</h2>
            <div>

                {/* -------------  ul for having contacts card --------------------- */}

                <ul className='grid grid-flow-row grid-cols-1 md:grid-cols-4 justify-center gap-2 mt-[3%] px-[2%]'>

                    {/* --------------- mapping through contacts array to create contact card using li  */}

                    {contacts.map((contact, index) => (
                        <li key={index} className='  h-fit border border-solid border-white border-opacity-40 border-right-opacity-20 border-bottom-opacity-20 rounded-lg bg-cdbody text-center py-[1%] px-[2%] shadow-headcolor shadow-md' >
                            <div className="cdet mt-[7%] ">
                                <strong>{contact.firstName} {contact.lastName}</strong>
                                <br />
                                Status: {contact.status}
                            </div>
                            <div className="btnss  flex flex-nowrap justify-center items-center mb-[7%]">
                                <button className='btn  text-[0.7rem] mt-[4%] mr-[1%] ' type="submit" onClick={() => handleDeletedetails(contact)} > Delete</button>
                                <button className='btn min-w-fit text-[0.7rem] mt-[4%] mr-[1%] ' type="submit" onClick={() => handleViewdetails(contact)} > View Details</button>
                                <button className='btn text-[0.7rem] mt-[4%] ' type="submit" onClick={() => handleEditdetails(contact)} > Edit </button>
                            </div>


                        </li>
                    ))}



                </ul>


            </div>

        </div>
    );
};

export default ContactList;
