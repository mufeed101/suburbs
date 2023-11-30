import React, { useRef, useEffect, useState } from 'react'
import {MapContainer, TileLayer } from 'react-leaflet';
import geoData from './SA4_2021_AUST_GDA94.json';
import L from 'leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css';
import GeoJSONLayers from './GeoJSONLayers';
import InitialSetUp from './layers/InitialSetup';
import changeLayerColours from './layers/helperFunctions';      

const geoJsonLayer = L.geoJSON(geoData, {
  style: function() {
    return {
      //fillColor: "#0000ff",
      weight: 2,
      fillOpacity: 0.5,
    };
  }
});

function App() {
  const position = [-34.033, 150.66]
  const onScreenLayersRef = useRef(null)
  const [onScreenLayers, setOnScreenLayers] = useState([])

  useEffect(() => {
    const SA4s = onScreenLayers.map((layer) => layer.feature.properties.SA4_CODE21)

    if(SA4s.length){
      fetch(`/SA4/getAge?sa1List=${SA4s}`)
      .then(response => response.json())
      .then(data => {
        changeLayerColours(onScreenLayers, data)
      })
      .catch(error => {
        console.error("Error", error)
      })
    }
  }, [onScreenLayers])

  return (
    
      <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        < InitialSetUp onScreenLayersRef={onScreenLayersRef} geoJsonLayer={geoJsonLayer} />
        < GeoJSONLayers geoJsonLayer={geoJsonLayer} setOnScreenLayers={setOnScreenLayers}  />
      </MapContainer>

  );
}

export default App;
