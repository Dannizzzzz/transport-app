import { Navigate, useLocation } from "react-router-dom";
import { isLogin } from "../utils/localStorage";

export default function Auth({ children }) {
  let location = useLocation();
  if (location.pathname.includes("/login")) {
    return children;
  } else {
    if (isLogin()) {
      return children;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  }
}