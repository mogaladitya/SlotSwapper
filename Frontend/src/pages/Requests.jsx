import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Requests() {
  const [requests, setRequests] = useState({ incoming: [], outgoing: [] });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/swaps/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching swap requests:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (id, accept) => {
    try {
      const res = await api.post(`/swaps/swap-response/${id}`, { accept });
      alert(res.data.message || (accept ? "Swap accepted!" : "Swap rejected!"));
      setTimeout(fetchRequests, 300);
    } catch (err) {
      console.error("Swap response error:", err.response?.data || err.message);
      const msg = err.response?.data?.message || "Failed to respond to swap request.";
      alert(msg);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 font-inter">
        <h1 className="text-3xl font-semibold text-white mb-10 tracking-tight">
          Swap Requests
        </h1>

        {loading && (
          <p className="text-gray-400 mb-6 animate-pulse">Loading requests...</p>
        )}

        <div>
          <h2 className="text-xl font-medium text-gray-100 mb-4">Incoming Requests</h2>
          {requests.incoming.length === 0 ? (
            <p className="text-gray-400 text-sm bg-white/5 backdrop-blur-md rounded-xl p-4 inline-block border border-white/10">
              No incoming requests
            </p>
          ) : (
            <div className="space-y-4">
              {requests.incoming.map((req) => (
                <div
                  key={req._id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="font-medium text-gray-100">
                    <span className="text-indigo-400 font-semibold">
                      {req.requester?.fullName || "Unknown User"}
                    </span>{" "}
                    wants to swap{" "}
                    <b className="text-white">{req.theirSlot?.title}</b> with your{" "}
                    <b className="text-white">{req.mySlot?.title}</b>
                  </p>

                  <div className="mt-3 flex items-center space-x-3">
                    <span
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                        req.status === "PENDING"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : req.status === "ACCEPTED"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {req.status}
                    </span>

                    {req.status === "PENDING" && (
                      <div className="flex space-x-3 ml-auto">
                        <button
                          onClick={() => handleResponse(req._id, true)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:opacity-90 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleResponse(req._id, false)}
                          className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:opacity-90 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-medium text-gray-100 mb-4">Outgoing Requests</h2>
          {requests.outgoing.length === 0 ? (
            <p className="text-gray-400 text-sm bg-white/5 backdrop-blur-md rounded-xl p-4 inline-block border border-white/10">
              No outgoing requests
            </p>
          ) : (
            <div className="space-y-4">
              {requests.outgoing.map((req) => (
                <div
                  key={req._id}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <p className="font-medium text-gray-100">
                    You offered{" "}
                    <b className="text-white">{req.mySlot?.title}</b> for{" "}
                    <b className="text-white">{req.theirSlot?.title}</b>
                  </p>
                  <span
                    className={`mt-3 inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${
                      req.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : req.status === "ACCEPTED"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
