import { useCallback } from 'react'
import {useMap, useMapEvent} from 'react-leaflet';
import { debounce } from 'lodash';

function GeoJSONLayers(props) {
    const geoJsonLayer = props.geoJsonLayer
    const setOnScreenLayers = props.setOnScreenLayers
    const map = useMap();
    const debouncedFilterLayers = useCallback(debounce(() => {
        let mapBounds = map.getBounds();
        const filteredLayers = [];
        
        geoJsonLayer.eachLayer(function(layer) {
        if (layer.feature.geometry) {
            if (mapBounds.intersects(layer.getBounds())) {
                if(layer.feature.properties.SA4_CODE21 != "901"){
                    
                    filteredLayers.push(layer);
                }
            }
        }
        });

        setOnScreenLayers(filteredLayers)
    }, 1000), [map, geoJsonLayer]);
  
    // Attach the debounced function to the map move event
    useMapEvent("move", debouncedFilterLayers);
  }

export default GeoJSONLayers