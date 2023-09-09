// imports 
import React from 'react'
import Chead from './Chead'
import ContactPopup from './ContactPopup'
import ContactList from './ContactList'

// -------------  contacts section all components together --------------------

const ContactManager = () => {
  return (
    <div className='min-h-screen flex-1 pb-8 bg-gradient-to-b to-[#dff1ff] from-[#eadeff40] '>
      <ContactPopup/>
      <Chead/>
      <ContactList/>
    </div>
  )
}

export default ContactManager
