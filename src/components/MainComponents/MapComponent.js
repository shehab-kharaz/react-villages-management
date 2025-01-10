import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MAP_VILLAGES } from '../../queries/villageQueries';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);  
  const { loading, error, data } = useQuery(GET_MAP_VILLAGES);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([31.8996, 35.2042], 8);  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      const placeMarker = (latitude, longitude, name) => {
        if (latitude == null || longitude == null || !name) {
          return; 
        }

        const markerIcon = L.icon({
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          iconSize: [20, 35],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        L.marker([latitude, longitude], { icon: markerIcon })
          .addTo(mapInstance.current)
          .bindPopup(
            `<b>${name}</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}`
          );
      };

      if (data && data.mapVillages) {
        data.mapVillages.forEach(village => {
          placeMarker(village.latitude, village.longitude, village.name);
        });
      }
    }
  }, [data]);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error fetching villages: {error.message}</p>;

  return <div ref={mapRef} 
          style={{ width: '100%', borderRadius: '0.3rem' }} >
         </div>;
};

export default MapComponent;
