import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginToken: null,
    favouriteList: [],
  },
  reducers: {
    setLoginToken(state, action) {
      state.loginToken = action.payload;
    },
    setFavouriteList(state, action) {
      state.favouriteList = action.payload;
    },
  },
});

export const {setLoginToken, setFavouriteList} = userSlice.actions;
export default userSlice.reducer;
