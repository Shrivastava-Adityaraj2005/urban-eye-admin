import React, { useState } from "react";

export default function Filters() {
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  return (
    
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 px-4 sm:px-0">
      {/* Priority Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4">
        <label className="font-semibold w-full sm:w-28 mb-2 sm:mb-0">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800 max-h-40 overflow-y-auto"
        >
          {priority === "" && <option value="">Select</option>}
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4">
        <label className="font-semibold w-full sm:w-28 mb-2 sm:mb-0">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800 max-h-40 overflow-y-auto"
        >
          {category === "" && <option value="">Select</option>}
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}
