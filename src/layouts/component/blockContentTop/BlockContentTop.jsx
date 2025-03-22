import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { blo } from "blo";

import {
    generateWallets,
    generateAssets,
} from "../../../component/generateWallet";

import "./blockContentTop.scss";
import { iconArrowDown, iconEye, iconEyeSlash, listNav } from "../../../constant";
import generateRandomString from "../../../component/generateString";
import SwiperNav from "../swiperNav/SwiperNav";


function BlockContentTop({ ...props }) {
    const { isWallet, showToken, idWallet, showOption } = props;
    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const [randomString, setRandomString] = useState(generateRandomString());
    const [showBalance, setShowBalance] = useState(false);

    return (
        <div className="BlockContentTop">
            <div
                className={`BlockContentTop_wrapper ${
                    isWallet && "BlockContentTop_wrapper_blur"
                } row align-items-center`}
            >
                <div
                    className={`BlockContentTop_wrapper_left col-9 ${
                        isWallet
                            ? "align-items-center flex-row"
                            : "flex-column "
                    } d-flex `}
                >
                    {isWallet ? (
                        <>
                            <div className="BlockContentTop_icon me-2">
                                <img
                                    alt={randomString}
                                    src={blo(
                                        walletSelector.data[0].coldWallet[0]
                                            .name
                                    )}
                                    width={36}
                                    height={36}
                                    style={{ borderRadius: 8 }}
                                />
                            </div>
                            <div className="BlockContentTop_text d-flex flex-column">
                                <span>
                                    {walletSelector.data[0].coldWallet[0].name}
                                </span>
                                <span>
                                    {
                                        walletSelector.data[0].coldWallet[0]
                                            .address
                                    }
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span>wallet</span>
                            <span>the wallet for your digital assets</span>
                        </>
                    )}
                </div>
                <div className="BlockContentTop_wrapper_right d-flex col-3 justify-content-end">
                    <div className={`BlockContentTop_wrapper_box`}>
                        {isWallet ? (
                            iconArrowDown
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.7916 14.6335L19.8843 13.569C20.1061 12.5045 20.1061 11.4844 19.8843 10.4199L21.7916 9.35539C22.0133 9.22233 22.102 8.9562 22.0133 8.73444C21.5254 7.1377 20.6827 5.71838 19.6182 4.52083C19.4408 4.34341 19.1747 4.29906 18.9529 4.43212L17.0457 5.49661C16.2473 4.8313 15.3603 4.29906 14.3845 3.94423V1.77089C14.3845 1.54912 14.2071 1.32735 13.9409 1.283C12.2999 0.883815 10.6588 0.928169 9.10638 1.283C8.84026 1.32735 8.7072 1.54912 8.7072 1.77089V3.94423C7.68706 4.29906 6.79998 4.8313 6.00162 5.54096L4.0944 4.43212C3.87263 4.29906 3.60651 4.34341 3.4291 4.52083C2.36461 5.71838 1.52188 7.1377 1.03399 8.73444C0.945285 8.9562 1.03399 9.22233 1.25576 9.35539L3.16297 10.4199C2.98556 11.4844 2.98556 12.5045 3.16297 13.569L1.25576 14.6335C1.03399 14.7666 0.945285 15.0327 1.03399 15.2544C1.52188 16.8512 2.36461 18.2705 3.4291 19.4681C3.60651 19.6455 3.87263 19.6898 4.0944 19.5568L6.00162 18.4923C6.79998 19.1576 7.68706 19.6898 8.7072 20.0447V22.218C8.7072 22.4398 8.88461 22.6615 9.10638 22.7502C10.7475 23.1051 12.3886 23.0607 13.9409 22.7502C14.2071 22.6615 14.3845 22.4398 14.3845 22.218V20.0447C15.3603 19.6898 16.2473 19.1576 17.0457 18.4923L18.9529 19.5568C19.1747 19.6898 19.4408 19.6455 19.6182 19.4681C20.7271 18.2705 21.5254 16.8512 22.0577 15.2544C22.102 15.0327 22.0133 14.7666 21.7916 14.6335ZM11.5458 15.5206C9.54992 15.5206 7.99754 13.9682 7.99754 11.9723C7.99754 10.0207 9.54992 8.42396 11.5458 8.42396C13.4974 8.42396 15.0941 10.0207 15.0941 11.9723C15.0941 13.9682 13.4974 15.5206 11.5458 15.5206Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
            
            {showToken && (
                <div className="BlockContentTop_body mt-4">
                    <div className="BlockContentTop_title d-flex flex-column text-center">
                        <div className="">
                            <span className="me-2">Balance</span>
                            <span className="text-uppercase">
                                ({walletSelector.data[0].assets[idWallet].name})

                            </span>
                        </div>
                        <div className="text-white mt-2">
                            <span className="me-3">
                                { showBalance ? (
                                    walletSelector.data[0].assets[idWallet].quantity
                                ) : "*******" }

                            </span>
                            <span className="iconeye" onClick={() => setShowBalance(!showBalance)}>
                                { showBalance ? iconEye : iconEyeSlash }
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {showOption && (
                <div className="BlockContentTop_swiper">
                   <SwiperNav />
                </div>
            )}
        </div>
    );
}

export default BlockContentTop;
