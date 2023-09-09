
import { createAction } from '@reduxjs/toolkit';

// for adding contact 

export const addContact = createAction('contacts/add');

// for all modifications in contactlist like create view edit popup
export const modifyContact = createAction('contacts/modify');


// for deleting contact 

export const deleteContact = createAction('contacts/delete');


// for updating contact 
export const updateContact = createAction('contacts/update');

