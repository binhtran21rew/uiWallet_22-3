import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    generateWallets,
    generateAssets,
} from "../../component/generateWallet";

import './showWallet.scss';
import BlockContentTop from '../../layouts/component/blockContentTop/BlockContentTop';
function ShowWallet({...props}) {
    const location = useLocation();
    const {isWallet} = location.state;

    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();


    if(isWallet){
        
        return(

            <IsWallet />
        )
    }

    return(
        <IsWallet />
    )
}


function IsWallet(){
    const location = useLocation();
    var walletSelector = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const {isWallet, idWallet} = location.state;

    console.log(isWallet);
    
    return(
        <div className="ShowWallet">
            <div className="Block_Top">
                <BlockContentTop isWallet={true} showToken={true} idWallet={idWallet} showOption={true}/>
            </div>

        </div>
    )
}



export default ShowWallet