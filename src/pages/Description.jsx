import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Description() {
    const [detail, setDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getDetail();
    }, []);

    const getDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/complaint/${id}`);
            const complaint = response.data;

            let base64Image = null;

            if (complaint.imageData) {
                if (typeof complaint.imageData === "string") {
                    base64Image = complaint.imageData;
                } else if (complaint.imageData.data) {
                    base64Image = byteArrayToBase64(complaint.imageData.data);
                }
            }

            const complaintWithImage = {
                ...complaint,
                base64Image,
            };

            setDetail(complaintWithImage);
        } catch (error) {
            console.error("Error loading complaint detail", error);
        }
    };

    const byteArrayToBase64 = (byteArray) => {
        const uint8Array = new Uint8Array(byteArray);
        let binary = "";
        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        return window.btoa(binary);
    };

    if (!detail) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading complaint details...</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-124px)] bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md h-auto rounded-2xl bg-white flex flex-col items-center p-6 space-y-6 shadow-lg">

                {/* Image Box */}
                <div className="w-full h-40 bg-gray-200 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                    {detail.base64Image ? (
                        <img
                            src={`data:image/jpeg;base64,${detail.base64Image}`}
                            alt="Complaint"
                            className="object-cover h-full w-full"
                        />
                    ) : (
                        <span className="text-gray-400">No image available</span>
                    )}
                </div>

                {/* Title Input (Read-only) */}
                <input
                    type="text"
                    placeholder="Enter title"
                    value={detail.title}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
                />

                {/* Description Input (Read-only) */}
                <textarea
                    placeholder="Enter description"
                    value={detail.description}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
                    rows="3"
                />

                {/* Assign Button */}
                <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                    Assign
                </button>
            </div>
        </div>
    );
}

export default Description;
