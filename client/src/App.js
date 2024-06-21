import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes"; // Import AppRoutes
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes /> {/* Render AppRoutes để hiển thị các routes */}
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
