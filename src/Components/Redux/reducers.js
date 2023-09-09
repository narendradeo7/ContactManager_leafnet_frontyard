// src/reducers.js

import { createReducer } from '@reduxjs/toolkit';
import { addContact, modifyContact, deleteContact, updateContact } from './actions';

// setting initialState for the reducer 

const initialState = {
    contacts: [
        {
            id: 1,
            firstName: 'Shantanu',
            lastName: 'Khanna',
            status: 'active',
        },
        {
            id: 2,
            firstName: 'Arnav',
            lastName: 'Raj',
            status: 'inactive',
        },
    ],
    showPopup: { type: '', status: false, viewFor: '' }
};

const contactReducer = createReducer(initialState, (builder) => {
    builder.addCase(addContact, (state, action) => {
        state.contacts.push(action.payload);
    }).addCase(deleteContact, (state, action) => {
        const contactToDelete = action.payload;
        state.contacts = state.contacts.filter((contact) => contact.id !== contactToDelete.id);
    }).addCase(modifyContact, (state, action) => {

        // if view is there
        state.showPopup.type = action.payload.type;
        // show popup as per req
        state.showPopup.status = action.payload.status;
        if (action.payload.type === 'view' || action.payload.type === 'edit') {
            state.showPopup.viewFor = action.payload.viewFor;
        }

    }).addCase(updateContact, (state, action) => {
        const ctoUpdate = action.payload;
        console.log('in the udpate reducer');
        console.log(ctoUpdate);


        // Find the contact to edit by its ID
        state.contacts = state.contacts.map((contact) => {
            if (contact.id === ctoUpdate.id) {
                // Iterate over keys of ctoUpdate.viewFor and update corresponding values
                Object.keys(ctoUpdate).forEach((key) => {

                    contact[key] = ctoUpdate[key];

                });
            }
            return contact;
        });


    })



});

export default contactReducer;
