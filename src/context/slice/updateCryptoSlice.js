import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const UpdateCryptoSlice = createSlice({
    name: 'crypeto',
    initialState: {
        data: [], 
        total: []
    },
    reducers: {
        addCryptoData: (state, action) => {
            
            state.data = [action.payload];
        
            const total = state.data.flat().reduce(
                (acc, item) => {
                    acc.price += parseInt(item.price);
                    acc.quantity += parseFloat(item.quantity);
                    acc.percentChange += parseFloat(item.percentChange);
                    acc.valueChange += parseFloat(item.valueChange);
                    return acc;
                },
                { price: 0, quantity: 0, percentChange: 0, valueChange: 0 }
            );

            state.total = [total];

        },

        resetCryptoData: (state) => {
            state.data = [];
            state.total = [];

        },
    },
})

export const { addCryptoData, resetCryptoData} = UpdateCryptoSlice.actions;
const updateCryptoReducer = UpdateCryptoSlice.reducer;

export default updateCryptoReducer;