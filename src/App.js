// imports 
import React from 'react';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import ContactManager from './Components/Contacts/ContactManager';
import ChartnMapsec from './Components/ChartnMaps/ChartnMapsec';

function App() {
  return (
      <div className="App flex">
        {/* sidebar for navigation */}
        <Sidebar />
        {/* routes  */}
        <Routes>
          <Route path='/' element={<ContactManager />} />
          <Route path='/graph' element={<ChartnMapsec />} />

        </Routes>

      </div>
  );
}

export default App;
