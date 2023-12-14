import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ observationList }) {
  return (
    <div>
      <MapContainer center={[52.531677, 13.381777]} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {observationList &&
          observationList.map((observation) => {
            return (
              // <GeoJSON data={observation.location} key={observation._id}>
              //   <Tooltip>{observation.title}</Tooltip>
              // </GeoJSON>
              <Marker
                position={observation.location.coordinates}
                key={observation._id}
              ></Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default Map;
