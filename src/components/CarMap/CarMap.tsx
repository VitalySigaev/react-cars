import { FC, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Car } from '../../types/type';

interface CarMapProps {
    car: Car;
}

const CarMap: FC<CarMapProps> = ({ car }) => {
    useEffect(() => {
        const mapId = `map-${car.id}`;
        const map = L.map(mapId).setView([car.latitude, car.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        const bigDotIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: red; width: 16px; height: 16px; border-radius: 50%;"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker([car.latitude, car.longitude], { icon: bigDotIcon }).addTo(map).bindPopup(`${car.name} - ${car.model}`);

        return () => {
            map.remove();
        };
    }, [car]);

    return <div id={`map-${car.id}`} style={{ height: '200px' }}></div>;
};

export default CarMap;
