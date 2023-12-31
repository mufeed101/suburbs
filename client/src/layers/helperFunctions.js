import { GCCSA, SA4 } from "./constants";

function perc2color(perc) {
    var r, g, b = 0;
    if(perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

function compareLayersToData(data, layer, layerType){
    if (layerType === SA4) {
        return data.SA4_CODE == layer.feature.properties.SA4_CODE21;
    } else if (layerType === GCCSA) {
        return data.GCCSA_CODE == layer.feature.properties.GCC_CODE21;
    }
}
function changeLayerColours(layersArray, dataArray, layerType){
    const min = dataArray[0].age;
    const max = dataArray.slice(-1)[0].age
    const diff = max - min

    layersArray.map((layer) => {
        let perc = 100;
        const age = dataArray.find((data) => compareLayersToData(data, layer, layerType)).age
        if(diff > 0){
            perc = 100 - (age - min)*100/diff
        }
        layer.setStyle(
            {color: perc2color(perc)}
        )
        layer.bindTooltip(age.toString(), { permanent: true, direction: 'center' })

    })
}

export default changeLayerColours