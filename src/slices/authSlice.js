import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    signedIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = 1
    },
    signedOut: (state) => {
      state.value = 0
    },
    justSignedIn: (state) => {
      state.value = 3
    },
  },
})

// Action creators are generated for each case reducer function
export const { signedIn, signedOut, justSignedIn } = authSlice.actions

export default authSlice.reducer