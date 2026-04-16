import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  // 🔥 WAIT until checked
  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;