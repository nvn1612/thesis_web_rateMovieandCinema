import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes"; // Import AppRoutes

function App() {
  return (
    <BrowserRouter>
      <AppRoutes /> {/* Render AppRoutes để hiển thị các routes */}
    </BrowserRouter>
  );
}

export default App;
