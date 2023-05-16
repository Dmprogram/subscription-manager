// import { createSlice } from '@reduxjs/toolkit';

// const token = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

// const initialState = {
//   email: null,
//   token,
//   id: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       localStorage.setItem('userToken', action.payload.token);
//       state.email = action.payload.email;
//       state.token = action.payload.token;
//       state.id = action.payload.id;
//     },
//     removeUser(state) {
//       localStorage.removeItem('userToken');
//       state.email = null;
//       state.token = null;
//       state.id = null;
//     },
//   },
// });

// export const { setUser, removeUser } = userSlice.actions;

// export default userSlice.reducer;
