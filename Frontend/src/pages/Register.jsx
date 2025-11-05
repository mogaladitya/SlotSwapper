import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.acceptTerms) {
      alert("Please accept the Terms of Service");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-inter px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-300 text-sm">Join <span className="text-indigo-400 font-semibold">SlotSwapper</span> and get started</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/80"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/80"
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
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/80"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/80"
            />
          </div>

          <label className="flex items-start space-x-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={form.acceptTerms}
              onChange={handleChange}
              className="mt-1 accent-indigo-500"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms</a> and{" "}
              <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity duration-300 text-white py-3 rounded-xl font-medium shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
