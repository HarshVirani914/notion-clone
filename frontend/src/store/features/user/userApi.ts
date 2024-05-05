import { baseAPI } from "@/store/baseApi";

export const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: (payload: any) => ({
        url: `user/search`,
        method: "GET",
        body: payload,
      }),
      onQueryStarted: async (_payload, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          return data || [];
        } catch (e) {
          console.log("Error while fetching users", e);
        }
      },
    }),
  }),
});

export const { useUsersQuery } = authApi;
