import React from "react";
import { Route, Routes, Navigate } from "react-router";
import Login from "./login";
import Dashboard from "./pages/dasboard";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
