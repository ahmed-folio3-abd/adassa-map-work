import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import SearchBox from './SearchBox';
import HeatMapLayer from './HeatMap';
import 'leaflet/dist/leaflet.css';
import pinImage from './pin.jpg';

const Map = () => {
  const [position, setPosition] = useState({ latitude: 28.005886, longitude: 35.202701 });
  const [currentTileLayer, setCurrentTileLayer] = useState('satellite');

  // const [draggable, setDraggable] = useState(false);
  const [heatmapData, setHeatmapData] = useState([
    { lat: 28.005886, lng: 35.202701, intensity: 1.0 },
    { lat: 28.000584412563853, lng: 35.19643547106221, intensity: 0.1  },
    {lat: 28.00095568421457, lng: 35.196417629931716, intensity: 0.1   },
    { lat: 28.00137596108721, lng: 35.19633635575437, intensity: 0.6  },
    { lat: 28.00183824205481, lng: 35.19628679840291, intensity: 0.4  },
    { lat: 28.002286518655424, lng: 35.19622931139128, intensity: 0.4  },
    { lat: 28.002888812994797, lng: 35.196211470260785, intensity: 0.6 },
    { lat:28.002301176545355, lng: 35.19596170108852, intensity: 1.0 },
    { lat: 28.002315396984045, lng: 35.195587047027665, intensity: 1.0 },
    { lat: 28.002238605257556, lng: 35.19502209322125, intensity: 1.0 },
    { lat:28.000575496688406, lng: 35.1964545465749, intensity: 0.1 },
    { lat:28.000844090802715, lng:35.19640520706334, intensity: 0.2 },
    { lat:28.000872789780058, lng: 35.196390538119964, intensity: 0.2 },
    { lat:28.0022528257045, lng: 35.19450471435122, intensity: 1.0 },


    // 35.20051100175018
  ]);

  // const generateDummyGPSData = () => {
  //   const dummyData = [
  //     { lat: 28.005886, lng: 35.202701, intensity: 1.0 },
  //     { lat: 28.005880, lng: 35.202708, intensity: 0.8 },
  //     { lat: 28.005883, lng: 35.202705, intensity: 0.4 },
  //     // Add more coordinates as needed
  //   ];
  //   setHeatmapData(dummyData);
  // };

  // // Step 2: Display Truck Route
  // const [heatmapTruckData, setHeatmapTruckData] = useState([]);
  
  const [zoomLevel, setZoomLevel] = useState(14); 



  const satelliteTileLayerUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWhtZWQ0MDRhYmQiLCJhIjoiY2x4OTdiY2sxMDBxbzJsc2NkY3NraWU4NSJ9.n5IcWBpTVxr3eZfttHRwUA&language=en`;
  // const satelliteTileLayerUrl = 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=3a614a63c7324f758eb904c4e646cd1a';
  // const satelliteTileLayerUrl = 'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=3a614a63c7324f758eb904c4e646cd1a';
  // const satelliteTileLayerUrl = 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=3a614a63c7324f758eb904c4e646cd1a';
  const transportTileLayerUrl = 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=3a614a63c7324f758eb904c4e646cd1a';
  

  const handleSearch = (location) => {
    console.log('Location found:', location);
    setPosition(location);
  };

  const toggleTileLayer = () => {
    setCurrentTileLayer(currentTileLayer === 'satellite' ? 'transport' : 'satellite');
  };
  

  const shadowIcon = L.icon({
    iconUrl: pinImage, // Use the same pin image
    iconSize: [45, 40],
    iconAnchor: [12, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Leaflet's default marker shadow
    shadowSize: [41, 41], // Size of the shadow image
    shadowAnchor: [12, 41], // Anchor position of the shadow relative to the icon
});


  const updatePosition = (e) => {
    const marker = e.target;
    setPosition({
      latitude: marker.getLatLng().lat,
      longitude: marker.getLatLng().lng,
    });
  };

  const ZoomCounter = () => {
    useMapEvent('zoom', (event) => {
      setZoomLevel(event.target._zoom);
    });

    return <div style={{ position: 'absolute', top: 80, left: 10, zIndex: 1000, backgroundColor: 'white', padding: 10, borderRadius: 5 }}>{`Zoom level: ${zoomLevel}`}</div>;
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <SearchBox onSearch={handleSearch} />
      <div style={{marginTop:'0px'}}>

<button onClick={toggleTileLayer} style={{marginTop:'10px'}}>Toggle Layer</button>
{/* <button onClick={generateDummyGPSData} style={{marginTop:'10px'}}>Generate Truck Route</button> Add this button */}

</div>
      <MapContainer center={[position.latitude, position.longitude]} zoom={16} minZoom={15} maxZoom={17} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <TileLayer
        > */}
        {/* <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWhtZWQ0MDRhYmQiLCJhIjoiY2x4OTdiY2sxMDBxbzJsc2NkY3NraWU4NSJ9.n5IcWBpTVxr3eZfttHRwUA&language=en`}
          // url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWhtZWQ0MDRhYmQiLCJhIjoiY2x4OTdiY2sxMDBxbzJsc2NkY3NraWU4NSJ9.n5IcWBpTVxr3eZfttHRwUA&language=en`}
          opacity={0.5}
        />
        <TileLayer
        url={'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=3a614a63c7324f758eb904c4e646cd1a'}
        // opacity={0.4}
        /> */}
        <TileLayer
           url={currentTileLayer === 'satellite' ? satelliteTileLayerUrl : transportTileLayerUrl}
        />

        {/* <TileLayer
          url={}
        /> */}
       <Marker
    position={[position.latitude, position.longitude]}
    icon={shadowIcon} // Use the shadow icon
    draggable={false}
    eventHandlers={{
        dragend: updatePosition,
    }}
/>
      

        <HeatMapLayer points={heatmapData} />
        <ZoomCounter />
      </MapContainer>
    </div>
  );
};

export default Map;
