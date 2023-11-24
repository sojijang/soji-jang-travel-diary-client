import "./Map.scss";
import MapFeature from "../../components/MapFeature/MapFeature";
import { MapProvider } from "react-map-gl";

export default function Map({ currentUser }) {
  return (
    <main className="map">
      <h2 className="map__title">Map</h2>
      <MapProvider>
        <MapFeature currentUser={currentUser} />
      </MapProvider>
    </main>
  );
}

