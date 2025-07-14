import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to the Restaurant App</h1>} />
      {/* Add more routes here as needed */}
    </Routes>
  );
}

export default App;
