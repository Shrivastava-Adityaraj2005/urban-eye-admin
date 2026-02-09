import { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Filters from "./Filters";
import SearchBar from "./SearchBar";
import LiveMap from "./LiveMap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Description from "../pages/Description";
import { UserContext } from "../store/user-context";
import Login from "./Login";

function NagivationRoot() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && !userContext.user) {
      userContext.setUser(JSON.parse(storedUser));
    }

    setAuthChecked(true);
  }, []);

  function handleSelectLocation(coords, cityKey) {
    setSelectedLocation(coords);
    setSelectedCity(cityKey);
  }

  if (!authChecked) {
    return null;
  }

  if (!userContext.user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSelectLocation={handleSelectLocation} />
              <Filters />
              <LiveMap
                selectedLocation={selectedLocation}
                selectedCity={selectedCity}
              />
            </>
          }
        ></Route>
        <Route path="/complain/:id" element={<Description />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default NagivationRoot;
