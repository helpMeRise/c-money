import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  data: {},
  error: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    accountRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    accountRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    accountRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  }
});

export default accountSlice.reducer;
