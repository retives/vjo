import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ActivityMap = ({ activity }) => {

  if (!activity || !activity.plot_data || !activity.plot_data.points || !activity.plot_data.centre) {
    return <p>Loading map...</p>;
  }

  const coords = activity.plot_data.points;
  const centre = activity.plot_data.centre;

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={centre}
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
