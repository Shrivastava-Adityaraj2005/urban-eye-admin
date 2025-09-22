import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Filters from './components/Filters'
import SearchBar from './components/SearchBar'
import LiveMap from './components/LiveMap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Description from './pages/Description'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  function handleSelectLocation(coords, cityKey) {
    setSelectedLocation(coords);
    setSelectedCity(cityKey);
  }

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<><SearchBar onSelectLocation={handleSelectLocation} /><Filters />
                                      <LiveMap
                                        selectedLocation={selectedLocation}
                                        selectedCity={selectedCity}/></>}>
          </Route>
          <Route path="/complain/:id" element={<Description/>}></Route>   
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;