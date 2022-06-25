import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../pages/components/cards/Card";
import Dashboard from "./Dashboard";

import "./Dashview.css";

function Dashview() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("app-user")) {
      console.log("Not logged in");
      navigate("/Login");
    }
  }, [navigate]);

  return (
    <div className="Dashview">
      

      <Card />
      <div className="graph-container">
        <div className="chart">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default Dashview;
