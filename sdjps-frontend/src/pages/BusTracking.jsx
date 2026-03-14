import { useEffect, useState } from "react"
import API from "../services/api"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function BusTracking() {

  const [buses, setBuses] = useState([])
  const [locations, setLocations] = useState({})

  const fetchBuses = async () => {

    const res = await API.get("/transport/buses")
    setBuses(res.data)

  }

  const fetchLocation = async (busId) => {

    const res = await API.get(`/transport/location/${busId}`)

    setLocations(prev => ({
      ...prev,
      [busId]: res.data
    }))

  }

  useEffect(() => {

    fetchBuses()

  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      buses.forEach(bus => {
        fetchLocation(bus.id)
      })

    }, 3000)

    return () => clearInterval(interval)

  }, [buses])

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Live Bus Tracking
      </h1>

      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.values(locations).map((loc, index) => (

          <Marker
            key={index}
            position={[loc.latitude, loc.longitude]}
          >

            <Popup>
              Bus ID: {loc.bus_id}
            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>

  )

}

export default BusTracking