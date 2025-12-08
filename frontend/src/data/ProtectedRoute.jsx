// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { GetUserId } from "./Check";

export default function ProtectedRoute({ children }) {
  const userId = GetUserId();

  if (userId===null) {
    return <Navigate to="/" replace />;
  }

  return children;
}
