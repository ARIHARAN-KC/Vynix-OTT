import React from "react";
import { Routes, Route } from "react-router-dom";

// Global Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Auth Components
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";

// Pages
import Home from "./pages/Home/Home";
import Browse from "./pages/Browser/Browse";
import Genres from "./pages/Genres/Genres";
import MyList from "./pages/MyList/My-List";
import New from "./pages/New/New";

function App() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/new" element={<New />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;