import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./Routes"; 
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes /> 
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
