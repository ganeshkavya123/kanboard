import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/login";
import Kanban from "./kanban"; 

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/kanban"
          element={isAuthenticated ? <Kanban /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/kanban" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
