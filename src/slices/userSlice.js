import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'

const initialState = {
  loading: false,
  justSignedUp: false,
  authState: false,
  user: {},
  error: '',
}

export const fetchUser = createAsyncThunk('user/fetchUser', ()=>{
    return Auth.currentAuthenticatedUser().then((user) => user.attributes)
    
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
        state.loading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.authState = true
        state.error = ''
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.user = {}
        state.error = action.error.message
        state.authState = 0
    })
  },

  reducers: {
    signedIn: (state) => {
     
      state.authState= 1
    },
    signedOut: (state) => {
      state.authState = 0
      state.user = {}
      state.error = 'user  signed out'
    },
    justSignedUp: (state) => {
      state.justSignedUp = true
      state.authState = true
    },
  },
  
})

// Action creators are generated for each case reducer function
export const { signedIn, signedOut, justSignedUp } = userSlice.actions

export default userSlice.reducer