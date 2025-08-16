import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contactus from "./pages/Contact/Contactus";
import TeamDetails from "./pages/TeamDetails/TeamDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/singleservice" element={<Services />} />
      <Route path="/contact" element={<Contactus />} />
      <Route path="/team-details" element={<TeamDetails />} />
    </Routes>
  );
}

export default App;
