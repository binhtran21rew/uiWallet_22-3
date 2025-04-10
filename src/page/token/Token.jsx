import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { createRoot } from "react-dom/client";

import { imageCirus, timeToken } from "../../constant";
import {addCryptoData, resetCryptoData} from '../../context/slice/updateCryptoSlice';
import UpdateTokenPrice from "../../component/UpdateTokenPrice";
import {dataUser, linkToken} from '../../constant';

import "./token.scss";
import Charts from "../../layouts/component/charts/Charts";
import NavBar from "../../layouts/component/navBar/NavBar";
import image from "../../assets/image/cirus.png";


function Token() {
    const location = useLocation();
    const navigator = useNavigate();

    var cryptoSelector = useSelector((state) => state.crypto);
    const dispatch = useDispatch();
    const imageRef = useRef();
    const {idToken} = location.state;

    const [prevPercentChange, setPrevPercentChange] = useState(0);
    const textture = useLoader(THREE.TextureLoader, imageCirus);


    useEffect(() => {
        const interval = setInterval(() => {
            const newCryptoData = UpdateTokenPrice(dataUser.listToken);
            setPrevPercentChange(cryptoSelector.data[0].percentChange);
            dispatch(addCryptoData(newCryptoData));
        }, 10000);
        return () => {
            clearInterval(interval)
        };
    }, [idToken]);

    useEffect(() => {
        if (!imageRef.current) return;
    
        const root = createRoot(imageRef.current);
        root.render(
          <Canvas style={{
            position: 'absolute',
            bottom: "85%",
            left: 0
          }}  camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={7}/>
            <mesh>
                <planeGeometry args={[3,3]}/>
                <meshBasicMaterial map={textture}/>
            </mesh>
            <mesh scale={[1.5,1.5,0]}>
                <ringGeometry args={[1, 1.4]}/>
                <meshStandardMaterial color={"rgb(255, 101, 101)"}/>
            </mesh> 

          </Canvas>
        );
    
        return () => root.unmount();
      }, []);

    
    return (
        <div className="Token">
            <div className="Token_top d-flex justify-content-between bg-white-blur p-3 rounded-3">
                <div className="d-flex flex-column text-capitalize">
                    <span className="fw-bold">
                        {cryptoSelector.data[0][idToken].name.name}

                    </span>
                    <div className="d-flex align-items-center">
                        <span>{cryptoSelector.data[0][idToken].name.detail} </span>
                        <div className="dot"></div>
                        <span>{cryptoSelector.data[0][idToken].pairValue}</span>

                    </div>
                </div>
                <div ref={imageRef} style={{width: "100px", position: "relative"}} /> 

                <div className="text-end">
                    <span className="fw-bold ">
                        ${cryptoSelector.data[0][idToken].price}
                    </span>
                    <div className="detail">
                        <span>{cryptoSelector.data[0][idToken].quantity}</span>
                    </div>
                </div>
            </div>
            <div className="Token_wrapper mt-4">
                <Tabs className="Token_wrapper_tabs">
                    <TabList className="tabs_list bg-white-blur d-flex rounded-3 p-2">
                        {timeToken.map((data, id) => {
                            return(
                                <Tab className="tabs_list_item col-6 text-center p-2"  key={id}>
                                    {data.label}
                                </Tab>
                            )
                        })}
                    </TabList>
                    {timeToken.map((data, id) => {
                        return(
                            <TabPanel>
                                <div className="TabPanel_item bg-white">
                                    <div className="d-flex justify-content-between p-3">
                                        <span className="text-label text-black-blur">For {data.text}</span>
                                        <div className="d-flex">
                                            <div
                                                style={{
                                                    color:
                                                        cryptoSelector.data[0][idToken].percentChange >
                                                        prevPercentChange
                                                            ? "green"
                                                            : "red",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div>
                                                    <span>{cryptoSelector.data[0][idToken].percentChange}%</span>
                                                </div>
                                                <div
                                                    className={`${
                                                        cryptoSelector.data[0][idToken].percentChange >
                                                        prevPercentChange
                                                            ? "half-right-box"
                                                            : "half-left-box"
                                                    }`}
                                                    style={{
                                                        borderRightColor:
                                                            cryptoSelector.data[0][idToken].percentChange >
                                                            prevPercentChange
                                                                ? "green"
                                                                : "red",
                                                    }}
                                                ></div>
                                            </div>

                                            <span className="">${cryptoSelector.data[0][idToken].valueChange}</span>

                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="Block_chart">
                                        <Charts key={`chart-${id}-${true}`} xa={true} height="300px"/>
                                    </div>
                                </div>

                            </TabPanel>
                        )

                    })}
                </Tabs>
            </div>

            <div className="Block_navBar">
                <NavBar color={"black"}/>
            </div>
        </div>
    );
}

export default Token;
