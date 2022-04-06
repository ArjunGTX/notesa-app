import { Route, Routes } from "react-router-dom";
import { PageContainer } from "./components";
import { useAuth } from "./contexts";
import {
  Archive,
  Home,
  Label,
  LandingPage,
  Login,
  PageNotFound,
  SignUp,
  Trash,
} from "./pages";

function App() {
  const {
    auth: { isLoggedIn },
  } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <PageContainer page={<Home />} requiresAuth />
          ) : (
            <LandingPage />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/archive"
        element={<PageContainer page={<Archive />} requiresAuth />}
      />
      <Route
        path="/trash"
        element={<PageContainer page={<Trash />} requiresAuth />}
      />
      <Route
        path="/label"
        element={<PageContainer page={<Label />} requiresAuth />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
