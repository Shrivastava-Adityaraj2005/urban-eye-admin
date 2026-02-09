import React from "react";

export default function Filters({ priority, setPriority, category, setCategory }) {
  
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 px-4 sm:px-0">
      {/* Priority Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4">
        <label className="text-white font-semibold w-full sm:w-28 mb-2 sm:mb-0">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-[#f3e8ff] w-full sm:w-40 border border-[#4b46b5] text-[#4b46b5] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b46b5] focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4">
        <label className="text-white font-semibold w-full sm:w-28 mb-2 sm:mb-0">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#f3e8ff] w-full sm:w-40 border border-[#4b46b5] text-[#4b46b5] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4b46b5] focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="sanitation">Sanitation & Waste Management</option>
          <option value="roads">Roads & Transportation</option>
          <option value="water">Water Supply & Drainage</option>
          <option value="electricity">Electricity & Street Lighting</option>
          <option value="safety">Public Safety & Law Enforcement</option>
          <option value="health">Health & Environment</option>
          <option value="parks">Parks & Public Spaces</option>
          <option value="infrastructure">Building & Infrastructure</option>
          <option value="mobility">Transport & Mobility</option>
          <option value="services">Citizen Services</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>
    </div>
  );
}
