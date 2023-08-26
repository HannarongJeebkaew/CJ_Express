import { createSlice ,PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  value: string;
  user: {
    name: string;
    token: string;
  } | null | []; // หรือคุณอาจใช้ interface ที่เป็นค่าเริ่มต้นของ user object ดีกว่า
}
const initialState:UserState = {
  value: "fiat han",user:[]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action: PayloadAction<{ name: string; token: string }>) => {
      state.value = "fiat login"
      state.user=action.payload
    },
    logout: (state) => {
      state.user=[]
      localStorage.removeItem('token');
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { login, logout} = userSlice.actions

export default userSlice.reducer