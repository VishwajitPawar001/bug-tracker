import { motion } from "framer-motion";
import { FaBug } from "react-icons/fa";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 top-[-50px] left-[-50px]"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-[-50px] right-[-50px]"></div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 grid md:grid-cols-2 overflow-hidden"
      >

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 to-purple-700 relative">
          <FaBug className="text-white text-5xl mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-200 text-lg leading-relaxed">{subtitle}</p>

          {/* Decorative Shape */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full"></div>
        </div>

        {/* Right Panel (Form Area) */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;