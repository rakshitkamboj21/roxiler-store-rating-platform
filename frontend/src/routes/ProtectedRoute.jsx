import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole,
}) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    switch (user.role) {
      case "ADMIN":
        return (
          <Navigate
            to="/admin/dashboard"
            replace
          />
        );

      case "STORE_OWNER":
        return (
          <Navigate
            to="/owner/dashboard"
            replace
          />
        );

      default:
        return (
          <Navigate
            to="/user/dashboard"
            replace
          />
        );
    }
  }

  return children;
}

export default ProtectedRoute;