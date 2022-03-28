import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts";
import { Home, LandingPage, Login, PageNotFound, SignUp } from "./pages";

function App() {
  const {
    auth: { isLoggedIn },
  } = useAuth();
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
