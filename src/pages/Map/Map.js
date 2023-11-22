import "./Map.scss";
import MapFeature from "../../components/MapFeature/MapFeature";

export default function Map() {
  return (
    <main className="map">
      <h2 className="map__title">Map</h2>
      <MapFeature />
    </main>
  );
}
