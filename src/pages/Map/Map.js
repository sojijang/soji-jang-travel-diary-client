import "./Map.scss";
import MapFeature from "../../components/MapFeature/MapFeature";
import { MapProvider } from "react-map-gl";

export default function Map() {
  return (
    <main className="map">
      <h2 className="map__title">Map</h2>
      <MapProvider>
        <MapFeature />
      </MapProvider>
    </main>
  );
}
