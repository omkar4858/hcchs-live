import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import { Toaster } from "./components/ui/toaster";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Apply />} />
          </Routes>
        </main>
        <Footer />
        <WhatsappFloat />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
