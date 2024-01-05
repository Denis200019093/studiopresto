import { productsApi } from "./products-service";

export const categoriesApi = productsApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<string[], null>({
      query: () => `/products/categories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
