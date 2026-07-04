import { baseApi } from "../api/baseApi";
import { setCredentials, clearCredentials } from "../auth/authSlice";
import type { AuthUser } from "../auth/authSlice";

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  };
}

interface TokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /auth/register
    register: builder.mutation<AuthResponse, RegisterInput>({
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          setCredentials({
            user: data.data.user,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          })
        );
      },
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    // POST /auth/login
    login: builder.mutation<AuthResponse, LoginInput>({
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          setCredentials({
            user: data.data.user,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          })
        );
      },
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // POST /auth/refresh
    refreshToken: builder.mutation<TokenResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),

    // GET /auth/me
    getMe: builder.query<{ success: boolean; data: AuthUser }, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    // PUT /auth/change-password
    changePassword: builder.mutation<{ success: boolean; message: string }, ChangePasswordInput>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PUT",
        body,
      }),
    }),

    // POST /auth/logout
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(clearCredentials());
      },
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetMeQuery,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;