import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", startTime: "", endTime: "" });
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    await api.post("/events", newEvent);
    setShowModal(false);
    setNewEvent({ title: "", startTime: "", endTime: "" });
    fetchEvents();
  };

  const makeSwappable = async (id) => {
    await api.put(`/events/${id}`, { status: "SWAPPABLE" });
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 font-inter">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            My Events
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition"
          >
            + New Event
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-white text-lg mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {new Date(event.startTime).toLocaleString()} –{" "}
                {new Date(event.endTime).toLocaleString()}
              </p>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  event.status === "SWAPPABLE"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {event.status}
              </span>

              {event.status === "BUSY" && (
                <button
                  onClick={() => makeSwappable(event._id)}
                  className="w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-xl font-medium shadow-md hover:opacity-90 transition"
                >
                  Make Swappable
                </button>
              )}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Create New Event
              </h2>
              <form onSubmit={handleCreateEvent} className="space-y-5">
                <input
                  type="text"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 text-gray-200 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="datetime-local"
                  value={newEvent.startTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, startTime: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/20 text-gray-200 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="datetime-local"
                  value={newEvent.endTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, endTime: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/20 text-gray-200 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-white/20 text-gray-300 rounded-xl hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-md hover:opacity-90 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
