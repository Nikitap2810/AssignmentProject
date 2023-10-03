import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginToken: null,
  },
  reducers: {
    setLoginToken(state, action) {
      state.loginToken = action.payload;
    },
  },
});

export const {setLoginToken} = userSlice.actions;
export default userSlice.reducer;
