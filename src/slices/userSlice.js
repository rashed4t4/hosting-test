import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'

const initialState = {
  loading: false,
  justSignedUp: false,
  isSignedIn: false,
  user: {},
  message: '',
}

export const fetchUser = createAsyncThunk('user/fetchUser', ()=>{
    return Auth.currentAuthenticatedUser().then((user) => user.attributes)
    
});

export const userSlice = createSlice({
  name: 'User',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
        state.loading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isSignedIn = true
        state.message = 'user fetched'
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.user = {}
        state.message = action.error.message
        state.isSignedIn = false
    })

  },

  reducers: {
    signedIn: (state) => {
     
      state.isSignedIn= true
    },
    signedOut: (state) => {
      state.loading = false
      state.isSignedIn = false
      state.justSignedUp = false
      state.user = {}
      state.message = 'user  signed out'
    },
    justSignedUp: (state) => {
      state.loading = false
      state.justSignedUp = true
      state.isSignedIn = true
      state.user = {}
      state.message = 'user just signed Up'
    },
  },
  
})

// Action creators are generated for each case reducer function
export const { signedIn, signedOut, justSignedUp } = userSlice.actions

export default userSlice.reducer