import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
  },
  reducers: {
    setAddressList(state, action) {
      state.addressList = action.payload;
    },
  },
});

export const {setAddressList} = addressSlice.actions;
export default addressSlice.reducer;
