import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { blo } from "blo";

import {
    generateWallets,
    generateAssets,
} from "../../../component/generateWallet";

import "./blockContentTopWallet.scss";

import generateRandomString from "../../../component/generateString";
import SwiperNav from "../swiperNav/SwiperNav";
import Icon from "../../../component/Icon";
import BlockContent from "../blockContent/BlockContent";

function BlockContentTopWallet({ ...props }) {
    const { showToken, idWallet, showOption, isToken, isCloseNav, onClick, listBox } = props;
    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();

    const [randomString, setRandomString] = useState(generateRandomString());
    const [showBalance, setShowBalance] = useState(false);
    const [showIdWallet, setShowIdWallet] = useState(0);
    


    return (
        <div className="BlockContentTopWallet">
            <BlockContent 
                type={"showInfoWallet"} 
                isChange={true}
                isToken={isToken} 
                showId={showIdWallet} 
                setShowId={setShowIdWallet}
                onClickScan={onClick}
                listBox={listBox}
            />

            {showToken && (
                <div className="BlockContentTopWallet_body mt-4">
                    <div className="BlockContentTopWallet_title d-flex flex-column text-center">
                        <div className="">
                            <span className="me-2">Balance</span>
                            <span className="text-uppercase">
                                ({walletSelector.data[0].assets[idWallet].name})
                            </span>
                        </div>
                        <div className="text-white mt-2">
                            <span className="me-3">
                                {isToken && (showBalance
                                    ? walletSelector.data[0].coldWallet[showIdWallet].totalWallet
                                    : "*******")
                                }
                                {!isToken && (showBalance
                                    ? walletSelector.data[0].coldWallet[0].totalWallet
                                    : "*******")
                                }

                            </span>
                            <span
                                className="iconeye"
                                onClick={() => setShowBalance(!showBalance)}
                            >
                                {showBalance ?  <Icon name={"iconEye"} />: <Icon name={"iconEyeSlash"} /> }
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {showOption && (
                <div className="BlockContentTopWallet_swiper">
                    <SwiperNav isCloseNav={isCloseNav} showIdWallet={showIdWallet}/>
                </div>
            )}
        </div>
    );
}

export default BlockContentTopWallet;
