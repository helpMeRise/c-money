import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  data: {},
  loading: true,
  error: ''
};

export const myCurrenciesSlice = createSlice({
  name: 'myCurrencies',
  initialState,
  reducers: {
    myCurrenciesRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    myCurrenciesRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.payload;
      state.error = '';
    },
    myCurrenciesRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    }
  }
});

export default myCurrenciesSlice.reducer;
