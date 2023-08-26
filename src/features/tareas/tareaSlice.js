import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tareaService from './tareaService';

const initialState = {
  tareas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


// borrar una tarea 

export const deleteTarea = createAsyncThunk('tareas/borrar', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await tareaService.deleteTarea(id,token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// obtener tareas de usuario

export const getTareas = createAsyncThunk('tareas/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await tareaService.getTareas(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// crear una tarea
export const crearTarea = createAsyncThunk('tareas/crear', async (tareaData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await tareaService.crearTarea(tareaData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const tareaSlice = createSlice({
  name: 'tarea',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(crearTarea.pending, (state) => {
        state.isLoading = true
      })
      .addCase(crearTarea.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tareas.push(action.payload)
      })
      .addCase(crearTarea.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTareas.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTareas.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tareas = action.payload
      })
      .addCase(getTareas.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTarea.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTarea.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tareas = state.tareas.filter((tarea)=>tarea._id !== action.payload.id)
      })
      .addCase(deleteTarea.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = tareaSlice.actions
export default tareaSlice.reducer
