import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   userData:(state,action)=>{
    console.log("strateddddddddddddddd");
    console.log("action.payload",action.payload);
    state.user=action.payload

   }
  },
})

// Action creators are generated for each case reducer function
export const {userData } = userSlice.actions

export default userSlice.reducer