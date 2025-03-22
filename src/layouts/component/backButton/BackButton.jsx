import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


import { iconArrowLeftDirection } from "../../../constant";

import './backButton.scss';
const BackButton = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    return location.pathname !== "/" ? (
        <div className="BackButton" onClick={() => navigate(-1)}>
          {iconArrowLeftDirection}
      </div>
    ) : null;
};

export default BackButton;