import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts";
import {
  Home,
  LandingPage,
  Login,
  PageNotFound,
  SignUp,
} from "./pages";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    auth: { isLoggedIn },
  } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (pathname === "/login" || pathname === "/sign-up") navigate("/");
  }, [pathname, isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
