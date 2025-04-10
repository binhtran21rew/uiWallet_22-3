import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    generateWallets,
    generateAssets,
} from "../../component/generateWallet";

import {dataUser} from '../../constant';

const assets = generateAssets(dataUser.transaction);
const coldWallet = generateWallets(dataUser.typeWallet);


const UpdateWalletSlice = createSlice({
    name: 'wallet',
    initialState: {
        data: [{
            name: dataUser.name,
            addressWallet: dataUser.address,
            coldWallet: coldWallet,
            assets: assets,
        }], 
    },
    reducers: {
        addWalletData: (state, action) => {
            
            state.data = [action.payload];
            
        },

        resetWalletData: (state) => {
            state.data = [];
        },
    },
})

export const { addWalletData, resetWalletData} = UpdateWalletSlice.actions;
const updateWalletReducer = UpdateWalletSlice.reducer;

export default updateWalletReducer;