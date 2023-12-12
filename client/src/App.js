import React, { useRef, useEffect, useState } from 'react'
import {MapContainer, TileLayer } from 'react-leaflet';
import SA4data from './layers/geojsonlayers/SA4_2021_AUST_GDA94.json';
import GCCS from './layers/geojsonlayers/GCCSA_2021_AUST_GDA94.json';
import L from 'leaflet';

import './App.css';
import 'leaflet/dist/leaflet.css';
import GeoJSONLayers from './layers/MoveMap';
import InitialSetUp from './layers/InitialSetup';
import changeLayerColours from './layers/helperFunctions';      

const geoJsonLayer = L.geoJSON(SA4data, {
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
    const codes = onScreenLayers.map(
      (layer) => layer.feature.properties.SA4_CODE21 ?
      layer.feature.properties.SA4_CODE21 :
      layer.feature.properties.GCC_CODE21)

    if(codes.length){
      fetch(`/${onScreenLayersRef.current.layerType}/getAge?codes=${codes}`)
      .then(response => response.json())
      .then(data => {
        changeLayerColours(onScreenLayers, data, onScreenLayersRef.current.layerType)
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
        < GeoJSONLayers geoJsonLayer={geoJsonLayer} setOnScreenLayers={setOnScreenLayers} onScreenLayersRef={onScreenLayersRef} L={L}/>
      </MapContainer>
  );
}

export default App;
