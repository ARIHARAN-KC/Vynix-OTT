import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_APP_USER } from "../../constants";

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  // await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions);
  if (
    args &&
    args.url != "/account/login" &&
    result &&
    result.meta &&
    result.meta.response &&
    result.meta.response.status &&
    result.meta.response.status === 401
  ) {
    localStorage.removeItem(AUTH_APP_USER);
    window.location.reload();
  }
  return result;
};

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Login",
    "AppUser",
  ],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1",
  // baseUrl: "https://demoapi.runonweb.com/api/v1",
  baseUrl: import.meta.env.VITE_API_URL,

  prepareHeaders: (headers, { getState, endpoint }) => {
    const uploadEndpoints = ["uploadFile"];
    if (!endpoint || uploadEndpoints.indexOf(endpoint) < 0) {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
    }

    const state = getState();

    if (
      state.appUser &&
      state.appUser.language &&
      state.appUser.language.length > 0
    ) {
      headers.set("Accept-Language", state.appUser.language);
    }
    let appUser = null;
    if (state && state.appUser && state.appUser.token) {
      appUser = state.appUser;
    } else {
      const storage = localStorage.getItem(AUTH_APP_USER);
      if (storage && storage.length > 0) {
        try {
          appUser = JSON.parse(storage);
        } catch (ex) {
          appUser = null;
        }
      }
    }
    if (appUser && appUser.token && appUser.token.length > 0) {
      headers.set("authorization", `Bearer ${appUser.token}`);
      headers.set("user-id", appUser.user?.id);
    }    
    return headers;
  },
});
