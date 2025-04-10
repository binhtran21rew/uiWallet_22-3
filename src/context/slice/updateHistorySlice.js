import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateListHistory } from '../../component/generateString';

const UpdateHistorySlice = createSlice({
    name: 'history',
    initialState: {
        data: [generateListHistory(5)], 
    },
    reducers: {
        addHistoryData: (state, action) => {
            state.data = [action.payload];

        },

        resetHistoryData: (state) => {
            state.data = [];
        },
    },
})

export const { addCryptoData, resetCryptoData} = UpdateHistorySlice.actions;
const updateHistoryReducer = UpdateHistorySlice.reducer;

export default updateHistoryReducer;