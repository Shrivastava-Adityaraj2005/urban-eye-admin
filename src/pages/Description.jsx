import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import api from "../../api";
import { UserContext } from "../store/user-context";

function Description() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();
  const userContext = useContext(UserContext);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const response = await api.get(`/complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${userContext.user.token}`,
        },
      });

      const complaint = response.data;

      const complaintWithImageUrl = {
        ...complaint,
        imageUrl:
          complaint.imageUrl ||
          `data:${complaint.imageType};base64,${complaint.imageBase64}`,
      };

      setDetail(complaintWithImageUrl);
    } catch (error) {
      console.error("Error loading complaint detail", error);
    }
  };

  if (!detail) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-800">
        <p className="text-slate-300">Loading complaint details...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-128px)] bg-gradient-to-br from-slate-800 via-slate-700 to-amber-800 flex items-center justify-center p-4">
      
      {/* 🔥 MAIN DETAIL BOX */}
      <div className="w-full max-w-md rounded-2xl bg-slate-900/90 backdrop-blur-md flex flex-col items-center p-6 space-y-6 shadow-2xl border border-slate-700">
        
        {/* Image Box */}
        <div className="w-full h-40 bg-slate-800 rounded-xl shadow-inner flex items-center justify-center overflow-hidden border border-slate-700">
          {detail.imageUrl ? (
            <img
              src={detail.imageUrl}
              alt="Complaint"
              className="object-cover h-full w-full"
            />
          ) : (
            <span className="text-slate-400">No image available</span>
          )}
        </div>

        {/* Title */}
        <input
          type="text"
          value={detail.title}
          readOnly
          className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-100 font-medium focus:outline-none"
        />

        {/* Description */}
        <textarea
          value={detail.description}
          readOnly
          rows="3"
          className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-200 resize-none focus:outline-none"
        />

        {/* Assign Button */}
        <button className="px-8 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition shadow-lg">
          Assign
        </button>
      </div>
    </div>
  );
}

export default Description;
