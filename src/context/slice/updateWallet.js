import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const UpdateWalletSlice = createSlice({
    name: 'wallet',
    initialState: {
        data: [], 
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