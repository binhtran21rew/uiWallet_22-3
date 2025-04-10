import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    generateWallets,
    generateAssets,
} from "../../../component/generateWallet";

import {
    linkShowWallet,

} from "../../../constant";

import { addWalletData } from "../../../context/slice/updateWallet";

import "./blockWallet.scss";
import FilterDropDown from "../filterDropDown/FilterDropDown";
import Icon from "../../../component/Icon";

function BlockWallet({ ...props }) {
    const dispatch = useDispatch();

    var walletSelector = useSelector((state) => state.wallet);

    const [isOpen, setIsOpen] = useState(false);
    const [changeIdWallet, setChangeIdWallet] = useState(0);


    
    return (
        walletSelector.data[0] && (
            <div className="BlockWallet">
                <div className="BlockWallet_wrapper row flex-column justify-content-evenly h-100 m-2">
                    <div className="BlockWallet_top col h-100 d-flex flex-column justify-content-evenly">
                        <div className="BlockWallet_name d-flex flex-column">
                            <span className="text-uppercase ">name</span>
                            <span className="text-capitalize  pt-2">
                                {walletSelector.data[0].name}
                            </span>
                        </div>
                        <div className="BlockWallet_address d-flex flex-column w-25">
                            <span className="text-uppercase ">address</span>
                            <span className="text-capitalize  pt-3">
                                {walletSelector.data[0].addressWallet}
                            </span>
                        </div>
                    </div>
                    <div className="BlockWallet_bottom col d-flex flex-column justify-content-evenly">
                        <div className="BlockWallet_wallet row d-flex">
                            <div className="col-7 d-flex align-items-center">
                                <div className="me-2">
                                    <Icon name={"iconWalletBlock"}/>
                                </div>

                                <span>cold wallet</span>
                            </div>
                            <Link
                                to={linkShowWallet}
                                state={{ isWallet: true, idWallet: changeIdWallet }}
                                className="col-5"
                            >
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="me-1">{<Icon name="iconToken" />}</div>
                                    <span className="fs-6">
                                        {
                                            walletSelector.data[0].coldWallet[0]
                                                .totalWallet
                                        }
                                    </span>

                                    <div className="d-flex align-items-center">
                                        {<Icon name={"iconArrowRight"} />}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="BlockWallet_section row d-flex">
                            <div
                                className=" col-7 d-flex align-items-center"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <div className="me-2">{<Icon name="iconToken" />}</div>
                                <div className="BlockWallet_box d-flex align-items-center">
                                    <span className="me-2">
                                        {
                                            walletSelector.data[0].assets[
                                                changeIdWallet
                                            ].name
                                        }
                                    </span>
                                    {isOpen ? <Icon name={"iconArrowUp"} /> : <Icon name={"iconArrowDown"} /> }

                                    <div className="BlockWallet_box_dropdown">
                                        <FilterDropDown
                                            bgColor={true}
                                            isOpen={isOpen}
                                            list={walletSelector.data[0].assets}
                                            onClick={setChangeIdWallet}
                                        />

                                    </div>
                                </div>
                            </div>
                            <Link
                                to={linkShowWallet}
                                state={{ isWallet: false, idWallet: changeIdWallet }}
                                className="col-5 d-flex"
                            >
                                <div className="d-flex align-items-center">
                                    <span className="fs-6">
                                        {
                                            walletSelector.data[0].assets[
                                                changeIdWallet
                                            ].quantity
                                        }
                                    </span>
                                    <div className="d-flex align-items-center">
                                        {<Icon name={"iconArrowRight"} />}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    );
}

export default BlockWallet;
