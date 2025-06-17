import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ActivityMap = ({activity, plotData}) => {

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer center={[48.3794, 31.1656]} zoom={6} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Object.entries(plotData).map(([id, coords]) => {
          const latLngs = coords.map(([lat, lon]) => [lat, lon]);

          return (
            <Polyline
              key={id}
              positions={latLngs}
              color="blue"
            >
              <Popup>
                {activity.name}
              </Popup>
            </Polyline>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ActivityMap;
