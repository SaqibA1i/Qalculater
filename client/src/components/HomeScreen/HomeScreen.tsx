import React from "react";
import BarOverview from "./BarOverview/BarOverview";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <h2>Grade Bars</h2>
      <BarOverview />
      <h2>Course Progress</h2>
      <BarOverview />
    </div>
  );
}

export default HomeScreen;
