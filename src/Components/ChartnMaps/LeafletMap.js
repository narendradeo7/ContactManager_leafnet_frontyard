import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// all component imported to draw a leafnet map 

const LeafletMap = () => {
    // state to handle countries data 
  const [countriesData, setCountriesData] = useState([]);


//   useffect to get data on render  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://disease.sh/v3/covid-19/countries'
        );
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    fetchData();
  }, []);

//   now ploting map as per popup and detials required 

  return (
    <div className="leaflet-map w-[95%] h-[70vh] text-center">
      <h2 className='text-sechead font-[700] font-head text-[1.2rem] md:text-[2.2rem] text-center my-[4%] md:my-[1%]'>Geographical Distrubution of Covid cases</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {countriesData.map((country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Total Cases: {country.cases}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
