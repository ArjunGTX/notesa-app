import { Route, Routes } from "react-router-dom";
import { Home, Login, PageNotFound, SignUp } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
