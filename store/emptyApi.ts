import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '@/env';

export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
  }),
  endpoints: () => ({}),
});
