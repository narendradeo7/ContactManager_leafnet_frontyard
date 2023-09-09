import React, { useState } from 'react';
import LineGraph from './LineGraph';
import LeafletMap from './LeafletMap';

const ChartnMapsec = () => {
  const [toggle, setToggle] = useState('Caseflc');

  const handleToggleClick = (option) => {
    setToggle(option);
  };

  return (
    <div className='h-screen flex-1'>

    {/* ---------------toggler ---------------- */}

      <div className="toggler flex items-center justify-center my-[3%] ">
        <button
          className={`font-head text-[0.9rem] font-[700] text-sechead ${
            toggle === 'Caseflc' ? 'bg-sechead text-white' : ''
          } px-4 py-2 rounded-md focus:outline-none`}
          onClick={() => handleToggleClick('Caseflc')}
        >
          Case Fluctuations
        </button>
        <button
          className={`font-head text-[0.9rem] font-[700] text-sechead ${
            toggle === 'Geodis' ? 'bg-sechead text-white' : ''
          } px-4 py-2 rounded-md focus:outline-none`}
          onClick={() => handleToggleClick('Geodis')}
        >
          Geo Distribution
        </button>
      </div>

      {/* -------------toggler ended ---------------------- */}

      <div className="chartnmaps flex justify-center">
      {toggle === 'Caseflc' ?<LineGraph />:<LeafletMap/>}
        
      </div>
    </div>
  );
};

export default ChartnMapsec;
