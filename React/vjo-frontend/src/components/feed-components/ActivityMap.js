import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ActivityMap = ({ activity }) => {
  const coords = activity.plot_data

  if (!coords || coords.length === 0) {
    return <p>No GPS data available for this activity.</p>;
  }

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={coords[0]}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        touchZoom={false}
        keyboard={false}
        preferCanvas={true} 
        zoomAnimation={false} 
        fadeAnimation={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={coords} color="blue">
          <Popup>{activity.name}</Popup>
        </Polyline>
      </MapContainer>
    </div>
  );
};

export default ActivityMap;
