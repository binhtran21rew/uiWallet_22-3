import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


import './backButton.scss';
import Icon from "../../../component/Icon";
import { linkCart, linkHome, linkShowWallet, linkToken } from "../../../constant";
const BackButton = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const buttonBack = () => {
      if(location.pathname === linkShowWallet){
        navigate(linkCart);
      }else if(location.pathname === linkCart){
        navigate(linkHome);
      }else{
        navigate(-1)
      }
    }
    return location.pathname !== "/" ? (
        <div className="BackButton" onClick={() => buttonBack()} style={{
          backgroundColor:  location.pathname === linkToken ? "rgba(180, 178, 178, 0.4)" : "rgba(255, 255, 255, 0.4)"
        }}>
          <Icon name={"iconArrowLeftDirection"} width={16} color={location.pathname === linkToken && "rgb(109, 109, 109)"}/>
      </div>
    ) : null;
};

export default BackButton;