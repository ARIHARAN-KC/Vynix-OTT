import { emptySplitApi } from "../../../pages/api/apiSlice";

const loginApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/account/login',
        method: 'POST',
        body: data,
        validateStatus: (response, result) => {
          if (result?.invalidData || result?.error) {
            return true;
          }
          return response.ok;
        },
      }),
      invalidatesTags: ['AppUser'],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = loginApi;
