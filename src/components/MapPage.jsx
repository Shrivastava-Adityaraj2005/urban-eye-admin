import React, { useState } from "react";
import SearchBar from "./SearchBar";
import LiveMap from "./LiveMap";
import Filters from "./Filters";

function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priority, setPriority] = useState("all");
  const [category, setCategory] = useState("all");
  console.log('d ', setPriority)

  return (
    <div className="relative w-full flex flex-col items-center">
      <SearchBar onSelectLocation={setSelectedLocation} />
      <Filters
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
      />
      <LiveMap selectedLocation={selectedLocation} priority={priority} category={category} />
    </div>
  );
}

export default MapPage;
