import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import {listNav} from '../../../constant';
import './navBar.scss';
import Icon from '../../../component/Icon';
import Popup from '../popup/Popup';
import Lottie from 'lottie-react';
import animationData from '../../../assets/animation/comingSoon.json';

function NavBar({...props}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [popup, setPopup] = useState(false);


  const handleClick = (name, link) => {
    if(name === 'top up'){
        navigate("/transaction", {state: {name: 'topup'}});
        
    }else if(name === "withdraw"){
        navigate("/transaction", {state: {name: 'withdraw'}});
        
    }else if(name === "Spend"){
      setPopup(true);
    }else{
        navigate(link);
    }

    
}
  return (
    <div className='NavBar' >
        {!popup && (
          <ul className='d-flex ps-0 justify-content-evenly'>
            {listNav.map((item, id) => {
              
              return(
                <div  key={`${id}.${item.name}`}  className='NavBar_item' 
                onClick={() => handleClick(item.name, item.link)}
                
                >
                  <div className="NavBar_item_icon d-flex justify-content-center">
                    <Icon name = {item.icon} color={props.color}/>
                  
                  </div>
                    <li className={props.color && 'text-black'}>{item.name}</li>

                </div>
              )
            })}

          </ul>
        )}

        {popup && (
          <Popup 
            isAlert={true}
            isOpen={popup}
            setIsOpen={setPopup}
            button={false}
            blur={false}
            listAlert={[{
                icon:
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  style={{ width: 200, height: 100 }}
                />,
                text: "Coming Soon!",
                detail: `Exciting News Coming Soon! Stay tuned for a thrilling announcement that will redefine your experience. We can't wait to share what's in store for you!`,
                button: false,
            }]}
          />
        )}
    </div>
  )
}

export default NavBar