import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

   

      // 🔥 SAFETY CHECK
      if (!res.data.token) {
        throw new Error("Token not received from backend");
      }

      // 🔥 CLEAR OLD (important)
      localStorage.removeItem("token");

      // 🔥 SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // 🔥 VERIFY (CRITICAL DEBUG)
      const savedToken = localStorage.getItem("token");
      

      if (!savedToken) {
        throw new Error("Token not saved in localStorage");
      }

      // ✅ SMALL DELAY (fixes race issues sometimes)
      setTimeout(() => {
        navigate("/");
      }, 100);

    } catch (err) {
      setError("Something went wrong");
      setError(err.response?.data || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[380px]"
      >
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-white text-6xl" />
        </div>

        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email ID"
            className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 text-gray-300 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-300">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <span className="cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 p-3 rounded-lg text-white font-semibold hover:opacity-90 transition">
            LOGIN
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;