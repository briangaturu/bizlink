import { baseApi } from "./baseApi";
import type { AuthUser } from "../auth/authSlice";

interface UserStats {
  userId: string;
  username: string;
  totalListings: number;
  activeListings: number;
  followers: number;
  isVerified: boolean;
}

interface SellerStats extends UserStats {
  completionRate: number;
  rating: number;
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /users
    getAllUsers: builder.query<{ success: boolean; data: AuthUser[] }, void>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // GET /users/:userId
    getUserById: builder.query<{ success: boolean; data: AuthUser }, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: "User", id: userId }],
    }),

    // GET /users/username/:username
    getUserByUsername: builder.query<{ success: boolean; data: AuthUser }, string>({
      query: (username) => `/users/username/${username}`,
      providesTags: ["User"],
    }),

    // PUT /users/:userId
    updateUser: builder.mutation<
      { success: boolean; data: AuthUser },
      { userId: string; body: UpdateUserInput }
    >({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),

    // DELETE /users/:userId
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // GET /users/stats/:userId
    getUserStats: builder.query<{ success: boolean; data: UserStats }, string>({
      query: (userId) => `/users/stats/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: "User", id: userId }],
    }),

    // GET /users/seller/:sellerId
    getSellerStats: builder.query<{ success: boolean; data: SellerStats }, string>({
      query: (sellerId) => `/users/seller/${sellerId}`,
      providesTags: (_result, _error, sellerId) => [{ type: "User", id: sellerId }],
    }),

    // GET /users/stats/top-sellers
    getTopSellers: builder.query<{ success: boolean; data: SellerStats[] }, number | void>({
      query: (limit = 10) => `/users/stats/top-sellers?limit=${limit}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetUserByUsernameQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserStatsQuery,
  useGetSellerStatsQuery,
  useGetTopSellersQuery,
} = usersApi;