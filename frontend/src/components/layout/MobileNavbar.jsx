import { Menu, Bell, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react';
/**
 * MobileNavbar — top bar inside the hero header.
 * Props: onMenuClick, city
 */
export default function MobileNavbar({ onMenuClick}) {

  const [city, setCity] = useState("Detecting location...");

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {

          const response = await fetch(
             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          const cityName = data.address.city || data.address.state || "Unknown Location";

          const country = data.address.country || "";

          setCity(`${cityName}, ${country}`);

        } catch (err) {
          setCity("Error detecting location");
        }
      }
    );

  }, []);

  return (
    <div className="hero-topbar">
      <button className="icon-btn" aria-label="Open menu" onClick={onMenuClick}>
        <Menu size={22} color="white" />
      </button>

      <div className="location">
        <span className="eyebrow">
          Current Location{' '}
          <ChevronDown size={12} color="white" style={{ display: 'inline', verticalAlign: 'middle' }} />
        </span>
        <span className="city">{city}</span>
      </div>

      <button className="icon-btn notif-btn" aria-label="Notifications">
        <Bell size={20} color="white" />
      </button>
    </div>
  )
}
