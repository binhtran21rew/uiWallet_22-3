import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Icon from '../../../component/Icon'

import './confirmButton.scss';


function ConfirmButton({...props}) {
  const {buttonRef, onClick, color, onClickBack} = props;
  const location = useLocation();
  const navigate = useNavigate();

    
  useGSAP(() => {
    const input = buttonRef?.current;
    
    if(!input) return;

    gsap.fromTo(input, {
        display: 'none',
        animation: "fadeBottomToTop 1s linear"
    }, {
        display: 'block',
        animation: "fadeBottomToTop 1s linear"
    },)

}, [buttonRef])
  return (
    <div ref={buttonRef} className='ConfirmButton d-flex'>
        <div className="col-2 d-flex justify-content-center align-items-center" style={{backgroundColor:  color ? color  : '#FFFFFF59'}}  onClick={() => onClickBack ? onClickBack() :  navigate(-1)}>
            <Icon name={"iconArrowLeft"}/>
        </div>
        <div className="col-10 d-flex justify-content-center align-items-center" style={{backgroundColor:  color ? color : '#FFFFFFBF'}} onClick={() => onClick()}>
            <span className='text-uppercase fw-bold'>
                {props.text}
            </span>
        </div>
    </div>
  )
}

export default ConfirmButton