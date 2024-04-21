import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducer/user';
import addressReducer from './reducer/address';

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
  },
});
