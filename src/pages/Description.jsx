import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import api from "../../api";
import { UserContext } from "../store/user-context";

function Description() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "" });

  const { id } = useParams();
  const userContext = useContext(UserContext);

  useEffect(() => {
    getDetail();
  }, []);

  // 🔥 POPUP
  const showPopup = (msg) => {
    setPopup({ show: true, message: msg });
    setTimeout(() => {
      setPopup({ show: false, message: "" });
    }, 2000);
  };

  // ✅ APPROVE
  const approveComplaint = async () => {
    try {
      setLoading(true);

      await api.patch(
        `/complaint/${id}/in-queue`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userContext.user.token}`,
          },
        }
      );

      showPopup("Complaint Approved");
      await getDetail(); // refresh status
    } catch (error) {
      console.log(error.message);
      showPopup("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY
  const verifyComplaint = async () => {
    try {
      setLoading(true);

      await api.patch(
        `/complaint/verify`,
        {
          complaintId: Number(id),
        },
        {
          headers: {
            Authorization: `Bearer ${userContext.user.token}`,
          },
        }
      );

      showPopup("Complaint Verified & Completed");
      await getDetail(); // refresh
    } catch (error) {
      console.log(error.message);
      showPopup("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH DATA
  const getDetail = async () => {
    try {
      const response = await api.get(`/complaint/${id}`, {
        headers: {
          Authorization: `Bearer ${userContext.user.token}`,
        },
      });

      const complaint = response.data;

      setDetail({
        ...complaint,
        initialImage: complaint.imageUri,
        finalImage: complaint.finalImageUri,
      });
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
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-slate-800 via-slate-700 to-amber-800 flex items-center justify-center p-4">

      {/* 🔥 POPUP */}
      {popup.show && (
        <div className="absolute top-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {popup.message}
        </div>
      )}

      <div className="w-full max-w-4xl rounded-2xl bg-slate-900/90 backdrop-blur-md p-6 shadow-2xl border border-slate-700">
        
        {/* 🔥 IMAGES */}
        <div className="flex gap-6 mb-4">
          
          <div className="w-1/2">
            <p className="text-slate-300 mb-2 text-sm">Before Work</p>
            <div className="h-64 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              {detail.initialImage ? (
                <img src={detail.initialImage} alt="Before" className="object-cover w-full h-full" />
              ) : (
                <span className="text-slate-400 flex justify-center items-center h-full">
                  No image
                </span>
              )}
            </div>
          </div>

          <div className="w-1/2">
            <p className="text-slate-300 mb-2 text-sm">After Work</p>
            <div className="h-64 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              {detail.finalImage ? (
                <img src={detail.finalImage} alt="After" className="object-cover w-full h-full" />
              ) : (
                <span className="text-slate-400 flex justify-center items-center h-full">
                  Not uploaded yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 TEXT */}
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={detail.title}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-100 font-medium"
          />

          <textarea
            value={detail.description}
            readOnly
            rows="2"
            className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-200 resize-none"
          />
        </div>

        {/* 🔥 BUTTON LOGIC */}
        <div className="flex justify-center">
          
          {/* APPROVE */}
          {detail.status === "Pending" && (
            <button
              onClick={approveComplaint}
              disabled={loading}
              className={`px-8 py-2 text-white font-semibold rounded-xl transition shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Approve"
              )}
            </button>
          )}

          {/* VERIFY */}
          {detail.status !== "Pending" && detail.finalImage && (
            <button
              onClick={verifyComplaint}
              disabled={loading}
              className={`px-8 py-2 text-white font-semibold rounded-xl transition shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify"
              )}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default Description;