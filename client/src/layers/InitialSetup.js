
import {useEffect} from 'react'
import {useMap} from 'react-leaflet';

function InitialSetUp(props){
    const onScreenLayersRef = props.onScreenLayersRef
    const geoJsonLayer  = props.geoJsonLayer
    const map = useMap();
    useEffect(() => {
      if (!onScreenLayersRef.current) {
        geoJsonLayer.addTo(map);
        onScreenLayersRef.current = geoJsonLayer
      }
    
    }, [map]);
    return null;
}

export default InitialSetUp
