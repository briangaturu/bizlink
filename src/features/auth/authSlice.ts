import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const savedUser = localStorage.getItem("bizlink_user");
const savedAccessToken = localStorage.getItem("bizlink_access_token");
const savedRefreshToken = localStorage.getItem("bizlink_refresh_token");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  accessToken: savedAccessToken || null,
  refreshToken: savedRefreshToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthUser;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("bizlink_user", JSON.stringify(action.payload.user));
      localStorage.setItem("bizlink_access_token", action.payload.accessToken);
      localStorage.setItem("bizlink_refresh_token", action.payload.refreshToken);
    },

    updateTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("bizlink_access_token", action.payload.accessToken);
      localStorage.setItem("bizlink_refresh_token", action.payload.refreshToken);
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("bizlink_user");
      localStorage.removeItem("bizlink_access_token");
      localStorage.removeItem("bizlink_refresh_token");
    },
  },
});

export const { setCredentials, updateTokens, clearCredentials } = authSlice.actions;
export default authSlice.reducer;