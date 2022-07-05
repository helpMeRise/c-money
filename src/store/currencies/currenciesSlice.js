import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  data: [],
  error: '',
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    currenciesRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    currenciesRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    currenciesRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    }
  }
});

export default currenciesSlice.reducer;
