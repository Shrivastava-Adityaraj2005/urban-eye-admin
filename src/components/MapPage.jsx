import React, { useState } from "react";
import SearchBar from "./SearchBar";
import LiveMap from "./LiveMap";

function MapPage() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className="relative w-full flex flex-col items-center">
            <SearchBar onSelectLocation={setSelectedLocation} />
            <LiveMap selectedLocation={selectedLocation} />
        </div>

    );
}

export default MapPage;
