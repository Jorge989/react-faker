import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { registerUserThunk } from "./userThunk";
const user = "myuser";
const initialState = {
  user: localStorage.getItem("usuario", user) || null,
};

export const registerUser = createAsyncThunk("auth", async (user, thunkAPI) => {
  return registerUserThunk("auth", user, thunkAPI);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = payload;

      const usuarioJSON = JSON.stringify(payload);

      localStorage.setItem("usuario", usuarioJSON);
    },
    [registerUser.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
