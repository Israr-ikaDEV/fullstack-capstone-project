import React from "react";
import "./landingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="content text-center">
        <h1 className="display-4 mb-3">GiftLink</h1>
        <h2 className="mb-4">Share Gifts and Joy!</h2>
        <p className="lead">
          "Sharing is the essence of community. It is through giving that we
          enrich and perpetuate both our lives and the lives of others."
        </p>
        <button
          className="btn btn-primary btn-lg mt-4"
          onClick={() => navigate("/main")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
