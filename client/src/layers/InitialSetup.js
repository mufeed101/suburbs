
import {useEffect} from 'react'
import {useMap} from 'react-leaflet';
import {SA4} from './constants';
function InitialSetUp(props){
    const onScreenLayersRef = props.onScreenLayersRef
    const geoJsonLayer  = props.geoJsonLayer
    const map = useMap();
    useEffect(() => {
        if (!onScreenLayersRef.current) {
            geoJsonLayer.addTo(map);
            onScreenLayersRef.current = {layerType: SA4, layers: geoJsonLayer}
        }
    
    }, [map]);
    return null;
}

export default InitialSetUp
