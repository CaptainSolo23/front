/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// obtener el usuario del localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}

// login usuario
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// registrar usuario
export const registrar = createAsyncThunk('auth/registrar', async (user, thunkAPI) => {
  try {
    return await authService.registrar(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// logout usuario
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false,
      state.isError = false,
      state.isSuccess = false,
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registrar.fulfilled, (state, action) => {
        state.isLoading = false,
        state.isSuccess = true,
        state.user = action.payload
      })
      .addCase(registrar.rejected, (state, action) => {
        state.isLoading = false,
        state.isError = true,
        state.message = action.payload,
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false,
        state.isSuccess = true,
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        // eslint-disable-next-line no-sequences
        state.isLoading = false,
        state.isError = true,
        state.message = action.payload,
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer