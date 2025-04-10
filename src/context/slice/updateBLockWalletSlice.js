import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Icon from "../../component/Icon";

const UpdateBlockWalletSlice = createSlice({
    name: 'blockWallet',
    initialState: {
        data: [
            {amount : 100, address: "0xaddresswallet", icon: "iconChip", lockKey: "", lockTime: ""},
            {amount : 100, address: "{Code}fdGFGHF7855", icon: "iconPresent", lockKey: "", lockTime: ""},
            {amount : 100, address: "{Code}fdGFGHF7855", icon: "iconPresent", lockKey: "", lockTime: ""},
        ], 
    },
    reducers: {
        addBlockWallet: (state, action) => {
            state.data = [action.payload];
        },

        resetBlockWallet: (state) => {
            state.data = [];
        },
        updateBlockWallet: (state, action) => {
            const { idWallet, type, time, key } = action.payload;
            state.data = state.data.map((item, index) =>
                index === idWallet
                    ? {
                        ...item,
                        lockKey: type === "key" ? key : item.lockKey,
                        lockTime: type === "time" ? time : item.lockTime
                    }
                    : item
            );
        },
    },
})

export const { addBlockWallet, resetBlockWallet, updateBlockWallet} = UpdateBlockWalletSlice.actions;
const updateBlockWalletReducer = UpdateBlockWalletSlice.reducer;

export default updateBlockWalletReducer;