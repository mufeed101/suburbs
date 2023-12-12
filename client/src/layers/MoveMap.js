import { useCallback } from 'react'
import {useMap, useMapEvent} from 'react-leaflet';
import { debounce } from 'lodash';
import SA4data from './geojsonlayers/SA4_2021_AUST_GDA94.json';
import GCCSdata from './geojsonlayers/GCCSA_2021_AUST_GDA94.json';

import {GCCSA, SA4} from './constants';

//if the zoom is less than 10, then change the layers
function MoveMap(props) {
    const geoJsonLayer = props.geoJsonLayer
    const setOnScreenLayers = props.setOnScreenLayers
    const onScreenLayersRef = props.onScreenLayersRef
    const map = useMap();
	const geoJSONStyle = {
		style: function() {
		return {
			//fillColor: "#0000ff",
			weight: 2,
			fillOpacity: 0.5,
		};
		}
	}
	const replaceLayers = (layers, layerType) => {
		map.removeLayer(onScreenLayersRef.current.layers)
		const GeoJsonLayer = props.L.geoJSON(layers, geoJSONStyle);
		GeoJsonLayer.addTo(map);
		onScreenLayersRef.current = {layerType: layerType, layers: GeoJsonLayer}
	}

    const debouncedFilterLayers = useCallback(debounce(() => {
        console.log(map.getZoom())
        if(map.getZoom() < 10 && onScreenLayersRef.current.layerType != GCCSA){
            replaceLayers(GCCSdata, GCCSA)
        } else if(map.getZoom() >= 10 && onScreenLayersRef.current.layerType != SA4){
			replaceLayers(SA4data, SA4)
        }
		
		let mapBounds = map.getBounds();
		const filteredLayers = [];
		

		onScreenLayersRef.current.layers.eachLayer(function(layer) {

		if (layer.feature.geometry) {
			if (mapBounds.intersects(layer.getBounds())) {
				filteredLayers.push(layer);
			}
		}
		});
		setOnScreenLayers(filteredLayers)

    }, 1000), [map, geoJsonLayer]);
  
    // Attach the debounced function to the map move event
    useMapEvent("move", debouncedFilterLayers);
  }

export default MoveMap