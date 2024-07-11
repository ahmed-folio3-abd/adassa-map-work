import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

const HeatMapLayer = ({ points }) => {
  const map = useMap();
  const [maxZoom, setMaxZoom] = useState(17); 


  useEffect(() => {
    if (!map) return;

    const heatLayer = L.heatLayer(
      points.map(point => [point.lat, point.lng, point.intensity]),
      {
        radius: 15,
        blur: 10,
        gradient: {
          0.1: 'blue',
          0.2: 'lime',
          0.4: 'yellow',
          0.6: 'orange',
          1.0: 'red'
        },
        maxZoom: maxZoom,
      }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

export default HeatMapLayer;
