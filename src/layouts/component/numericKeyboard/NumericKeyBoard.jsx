import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import "./numericKeyBoard.scss";


import Icon from "../../../component/Icon";

function NumericKeyBoard({ ...props }) {
    const {keyboardRef, onChange, dot=false} = props;

    useGSAP(() => {
        const input = keyboardRef.current;
        
        if(!input) return;

        gsap.fromTo(input, {
            display: 'none',
            animation: "fadeBottomToTop 1s linear"
        }, {
            display: 'block',
            animation: "fadeBottomToTop 1s linear"
        },)

    }, [keyboardRef])


    return (
        <div ref={keyboardRef} style={{ width: "100%", textAlign: "center", display: 'none' }}>
            <div style={{ width: "100%", color: "black" }}>

                {dot ? (
                    <Keyboard
                    keyboardRef={(r) => (keyboardRef.current = r)}
                    
                    onChange={onChange}
                    layout={{
                        default: [
                            "1 2 3",
                            "4 5 6",
                            "7 8 9",
                            ". 0 {bksp}",
                        ],
                    }}
                    display={{
                        "{bksp}": `<svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0477 6.02515C10.7549 5.73224 10.7549 5.25739 11.0477 4.96448C11.3407 4.67157 11.8156 4.67157 12.1084 4.96448L14.5834 7.43939L17.0582 4.96448C17.3511 4.67157 17.8259 4.67157 18.1189 4.96448C18.4117 5.25732 18.4117 5.73224 18.1189 6.02515L15.6439 8.5L18.1189 10.9749C18.4117 11.2678 18.4117 11.7427 18.1189 12.0355C17.8259 12.3284 17.3511 12.3284 17.0582 12.0355L14.5834 9.56067L12.1084 12.0355C11.8156 12.3284 11.3407 12.3284 11.0479 12.0355C10.7549 11.7426 10.7549 11.2678 11.0479 10.9749L13.5227 8.50006L11.0477 6.02515Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M7.95471 0.878662L0.333374 8.5L7.95471 16.1213C8.51733 16.684 9.2804 17 10.076 17H20.3334C21.9902 17 23.3334 15.6569 23.3334 14V3C23.3334 1.34314 21.9902 0 20.3334 0H10.076C9.2804 0 8.51733 0.316101 7.95471 0.878662ZM20.3334 15.7H10.076C9.62512 15.7 9.19275 15.5209 8.8739 15.2021L2.17188 8.5L8.8739 1.79791C9.19275 1.47913 9.62512 1.29999 10.076 1.29999H20.3334C21.2722 1.29999 22.0333 2.0611 22.0333 3V14C22.0333 14.9389 21.2722 15.7 20.3334 15.7Z" fill="black"/>
</svg>`,
                    }}
                    theme="hg-theme-default hg-layout-numeric"
                />
                ) : 
                (
                    <Keyboard
                    keyboardRef={(r) => (keyboardRef.current = r)}
                    
                    onChange={onChange}
                    layout={{
                        default: [
                            "1 2 3",
                            "4 5 6",
                            "7 8 9",
                            "{emptybksp} 0 {bksp}",
                        ],
                    }}
                    display={{
                        "{emptybksp}": " ",
                        "{bksp}": `<svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0477 6.02515C10.7549 5.73224 10.7549 5.25739 11.0477 4.96448C11.3407 4.67157 11.8156 4.67157 12.1084 4.96448L14.5834 7.43939L17.0582 4.96448C17.3511 4.67157 17.8259 4.67157 18.1189 4.96448C18.4117 5.25732 18.4117 5.73224 18.1189 6.02515L15.6439 8.5L18.1189 10.9749C18.4117 11.2678 18.4117 11.7427 18.1189 12.0355C17.8259 12.3284 17.3511 12.3284 17.0582 12.0355L14.5834 9.56067L12.1084 12.0355C11.8156 12.3284 11.3407 12.3284 11.0479 12.0355C10.7549 11.7426 10.7549 11.2678 11.0479 10.9749L13.5227 8.50006L11.0477 6.02515Z" fill="black"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.95471 0.878662L0.333374 8.5L7.95471 16.1213C8.51733 16.684 9.2804 17 10.076 17H20.3334C21.9902 17 23.3334 15.6569 23.3334 14V3C23.3334 1.34314 21.9902 0 20.3334 0H10.076C9.2804 0 8.51733 0.316101 7.95471 0.878662ZM20.3334 15.7H10.076C9.62512 15.7 9.19275 15.5209 8.8739 15.2021L2.17188 8.5L8.8739 1.79791C9.19275 1.47913 9.62512 1.29999 10.076 1.29999H20.3334C21.2722 1.29999 22.0333 2.0611 22.0333 3V14C22.0333 14.9389 21.2722 15.7 20.3334 15.7Z" fill="black"/>
    </svg>`,
                    }}
                    theme="hg-theme-default hg-layout-numeric"
                />
                )
                }

            </div>
        </div>
    );
}

export default NumericKeyBoard;
