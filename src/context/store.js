import {configureStore} from '@reduxjs/toolkit';

import updateCryptoReducer from "./slice/updateCryptoSlice";
import updateWalletReducer from './slice/updateWallet';

export const store = configureStore({
    reducer: {
        crypto: updateCryptoReducer,
        wallet: updateWalletReducer
    },
});

export default store;