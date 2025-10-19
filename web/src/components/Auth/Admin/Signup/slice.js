import { emptySplitApi } from "../../../../pages/api/apiSlice";

const adminSignUpApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    adminSignup: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
        validateStatus: (response, result) => {
          if (result?.invalidData || result?.error) {
            return true;
          }
          return response.ok;
        },
      }),
    }),
  }),
});

export const { useAdminSignupMutation } = adminSignUpApi;
