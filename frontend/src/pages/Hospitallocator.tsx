import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
  } from "react-leaflet";
  import type { MapContainerProps } from "react-leaflet";
  import L, { Icon } from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { motion } from "framer-motion";
  
  // Fix default marker path (Vite issue)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL(
      "leaflet/dist/images/marker-icon-2x.png",
      import.meta.url
    ).href,
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
    shadowUrl: new URL(
      "leaflet/dist/images/marker-shadow.png",
      import.meta.url
    ).href,
  });
  
  // Custom Icons
  const hospitalIcon: Icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  
  const userIcon: Icon = new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  
  // Marker wrapper to bypass TS icon typing issues
  function CustomMarker({
    position,
    icon,
    children,
  }: {
    position: [number, number];
    icon: Icon;
    children?: React.ReactNode;
  }) {
    return (
      <Marker
        position={position}
        {...{ icon: icon as unknown as never }} // 👈 Trick to bypass TS type check
      >
        {children}
      </Marker>
    );
  }
  
  // Fly-to helper component
  function FlyToLocation({ coords }: { coords: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(coords, 13);
    }, [coords]);
    return null;
  }
  
  export default function HospitalLocator() {
    const [hospitals, setHospitals] = useState<
      { name: string; address: string; latitude: number; longitude: number }[]
    >([]);
    const [address, setAddress] = useState("Delhi");
    const [coords, setCoords] = useState<[number, number]>([28.6139, 77.209]);
    const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(false);
  
    const fetchHospitals = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/nearest-hospitals", {
          params: { address },
        });
        setHospitals(res.data.hospitals);
        setCoords([res.data.latitude, res.data.longitude]);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        alert("Failed to fetch hospital data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const userLocation: [number, number] = [latitude, longitude];
            setUserCoords(userLocation);
  
            try {
              const res = await axios.get(
                "https://nominatim.openstreetmap.org/reverse",
                {
                  params: {
                    format: "json",
                    lat: latitude,
                    lon: longitude,
                  },
                }
              );
              if (res.data.display_name) {
                setAddress(res.data.display_name);
                fetchHospitals();
              }
            } catch {
              console.warn("Reverse geocoding failed.");
            }
          },
          (err) => {
            console.warn("Geolocation error:", err);
            alert("Unable to access your location.");
          }
        );
      } else {
        alert("Geolocation is not supported.");
      }
    };
  
    useEffect(() => {
      fetchHospitals();
      getUserLocation();
    }, []);
  
    return (
      <div className="p-6 space-y-6">
        <motion.h1
          className="text-4xl font-bold text-center text-sanjeevani-primary"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Find Nearby Hospitals
        </motion.h1>
  
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-sanjeevani-primary"
            placeholder="Enter your location"
          />
          <button
            onClick={fetchHospitals}
            className="bg-sanjeevani-primary text-white px-5 py-2 rounded shadow hover:bg-sanjeevani-primary/90 transition"
          >
            Search
          </button>
        </motion.div>
  
        {loading && (
          <p className="text-center text-gray-500">Loading hospitals...</p>
        )}
  
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Map */}
          <div className="flex-1 rounded-xl overflow-hidden shadow-lg">
            <MapContainer
              {...({
                center: coords,
                zoom: 13,
                style: { height: "500px", width: "100%" },
                attributionControl: true,
              } as MapContainerProps)}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FlyToLocation coords={coords} />
  
              {userCoords && (
                <CustomMarker position={userCoords} icon={userIcon}>
                  <Popup>
                    <strong>You are here</strong>
                  </Popup>
                </CustomMarker>
              )}
  
              {hospitals.map((hospital, i) => (
                <CustomMarker
                  key={i}
                  position={[hospital.latitude, hospital.longitude]}
                  icon={hospitalIcon}
                >
                  <Popup>
                    <strong>{hospital.name}</strong>
                    <br />
                    {hospital.address}
                  </Popup>
                </CustomMarker>
              ))}
            </MapContainer>
          </div>
  
          {/* Hospital List */}
          {hospitals.length > 0 && (
            <div className="flex-1 overflow-y-auto max-h-[500px]">
              <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals</h2>
              <ul className="space-y-4">
                {hospitals.map((hospital, i) => (
                  <li key={i} className="border p-4 rounded shadow">
                    <h3 className="text-lg font-bold">{hospital.name}</h3>
                    <p className="text-gray-600">{hospital.address}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    );
  }
  