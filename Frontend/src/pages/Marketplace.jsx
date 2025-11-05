import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Marketplace() {
  const [swappableSlots, setSwappableSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offerSlot, setOfferSlot] = useState("");
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchSwappableSlots = async () => {
    const res = await api.get("/swaps/swappable-slots");
    setSwappableSlots(res.data);
  };

  const fetchMySlots = async () => {
    const res = await api.get("/events");
    setMySlots(res.data.filter((e) => e.status === "SWAPPABLE"));
  };

  const handleRequestSwap = async () => {
    try {
      await api.post("/swaps/swap-request", {
        mySlotId: offerSlot,
        theirSlotId: selectedSlot._id,
      });
      alert("Swap request sent!");
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send swap request");
    }
  };

  useEffect(() => {
    fetchSwappableSlots();
    fetchMySlots();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 font-inter">
        <h1 className="text-3xl font-semibold text-white mb-10 tracking-tight">
          Swappable Slots
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {swappableSlots.map((slot) => (
            <div
              key={slot._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-white text-lg mb-2">
                {slot.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {new Date(slot.startTime).toLocaleString()} –{" "}
                {new Date(slot.endTime).toLocaleString()}
              </p>
              <button
                onClick={() => {
                  setSelectedSlot(slot);
                  setShowModal(true);
                }}
                className="w-full mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2.5 rounded-xl font-medium shadow-md hover:opacity-90 transition"
              >
                Request Swap
              </button>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-4">
                Select one of your swappable slots
              </h2>

              <select
                value={offerSlot}
                onChange={(e) => setOfferSlot(e.target.value)}
                className="w-full border border-white/20 rounded-xl p-3 mb-5 text-gray-200 bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select your slot</option>
                {mySlots.map((slot) => (
                  <option key={slot._id} value={slot._id} className="bg-gray-800">
                    {slot.title} ({new Date(slot.startTime).toLocaleDateString()})
                  </option>
                ))}
              </select>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-white/20 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestSwap}
                  disabled={!offerSlot}
                  className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2.5 rounded-xl font-medium shadow-md hover:opacity-90 transition disabled:opacity-40"
                >
                  Confirm Swap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
