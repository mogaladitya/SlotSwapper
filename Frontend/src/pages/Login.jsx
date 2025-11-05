import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.email, form.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-inter px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-300 text-sm">Sign in to continue to <span className="text-primary font-semibold">SlotSwapper</span></p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/80"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity duration-300 text-white py-3 rounded-xl font-medium shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
