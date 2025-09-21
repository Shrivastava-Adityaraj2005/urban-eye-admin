import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Filters from './components/Filters'
import SearchBar from './components/SearchBar'
import LiveMap from './components/LiveMap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  function handleSelectLocation(coords, cityKey) {
    setSelectedLocation(coords);
    setSelectedCity(cityKey);
  }

  return (
    <>
      <Navbar />
      <SearchBar onSelectLocation={handleSelectLocation} />
      <Filters />
      <LiveMap
        selectedLocation={selectedLocation}
        selectedCity={selectedCity}
      />
      <Footer />
    </>
  );
}

export default App;