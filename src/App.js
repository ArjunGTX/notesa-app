import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { PageContainer, ProtectedRoute } from "./components";
import { useAuth } from "./contexts";
import {
  Archive,
  Home,
  LandingPage,
  Login,
  PageNotFound,
  SignUp,
  Trash,
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
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <PageContainer>
              <Home />
            </PageContainer>
          ) : (
            <LandingPage />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/archive"
        element={
          <ProtectedRoute>
            <PageContainer>
              <Archive />
            </PageContainer>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trash"
        element={
          <ProtectedRoute>
            <PageContainer>
              <Trash />
            </PageContainer>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
