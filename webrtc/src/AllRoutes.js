import React from "react";
import { Routes, Route } from "react-router-dom";
import VideoCall from "./VideoCall";
import App from "./App";
import Practice from "./Practice";
import Room from "./pages/Room";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/VideoCall" element={<VideoCall />} />
        <Route path="/Room" element={<App />} />
        <Route path="/Practice" element={<Practice />} />
        <Route path="/" element={<Room />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </div>
  );
};

export default AllRoutes;
