import React from "react";
import { Routes, Route } from "react-router-dom";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";

// Global Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout"
import VideoPlayerLayout from "./components/VideoPlayerLayout/VideoPlayerLayout";

// Auth Components
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import OAuthSuccess from "./components/Auth/OAuthSuccess/OAuthSuccess";

// Pages
import Home from "./pages/Home/Home";
import Browse from "./pages/Browser/Browse";
import Genres from "./pages/Genres/Genres";
import MyList from "./pages/MyList/My-List";
import New from "./pages/New/New";

function App() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-1">
        <Routes>
          {/* Pages without Layout (if you want Navbar+Footer on these) */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/browse" element={
            <>
              <Navbar />
              <Browse />
              <Footer />
            </>
          } />
          <Route path="/genres" element={
            <>
              <Navbar />
              <Genres />
              <Footer />
            </>
          } />
          <Route path="/my-list" element={
            <>
              <Navbar />
              <MyList />
              <Footer />
            </>
          } />
          <Route path="/new" element={
            <>
              <Navbar />
              <New />
              <Footer />
            </>
          } />

          {/* Auth pages with Layout */}
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          <Route path="/signup" element={
            <Layout>
              <Signup />
            </Layout>
          } />
          <Route path="/watch/:videoId" element={
            <VideoPlayerLayout>
            <VideoPlayer />
            </VideoPlayerLayout>
          } />
          <Route path="/oauth-success" element={
            <Layout>
              <OAuthSuccess />
            </Layout>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;