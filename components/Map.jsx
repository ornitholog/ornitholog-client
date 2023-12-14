import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  Marker,
  Circle,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ observationList }) {
  return (
    <div className="map-wrap">
      <MapContainer center={[52.531677, 13.381777]} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {observationList &&
          observationList.map((observation) => {
            const coordinates = [
              observation.location.coordinates[1],
              observation.location.coordinates[0],
            ];
            return (
              <CircleMarker
                center={coordinates}
                key={observation._id}
                radius={5}
              >
                <Tooltip>{observation.title}</Tooltip>
              </CircleMarker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default Map;
