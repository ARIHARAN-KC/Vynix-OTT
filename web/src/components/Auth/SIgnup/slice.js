import { emptySplitApi } from "../../../pages/api/apiSlice";

const signUpApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
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

export const { useSignupMutation } = signUpApi;
