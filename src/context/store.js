import {configureStore} from '@reduxjs/toolkit';

import updateCryptoReducer from "./slice/updateCryptoSlice";
import updateWalletReducer from './slice/updateWallet';
import updateHistoryReducer from './slice/updateHistorySlice';
import updateBlockWalletReducer from './slice/updateBLockWalletSlice';

export const store = configureStore({
    reducer: {
        crypto: updateCryptoReducer,
        wallet: updateWalletReducer,
        history: updateHistoryReducer,
        blockWallet: updateBlockWalletReducer,
    },
});

export default store;