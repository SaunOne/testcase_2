import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { MasterItem } from "../types/do.types"
import itemsData from "../../../data/items.json"

export const doApi = createApi({
  reducerPath: "doApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Items", "DOLines"],
  endpoints: (builder) => ({
    getItems: builder.query<MasterItem[], void>({
      queryFn: () => {
        return { data: itemsData as MasterItem[] }
      },
      providesTags: ["Items"],
    }),
    getItemById: builder.query<MasterItem | undefined, string>({
      queryFn: (id) => {
        const item = (itemsData as MasterItem[]).find((i) => i.id === id)
        return { data: item }
      },
      providesTags: (_result, _error, id) => [{ type: "Items", id }],
    }),
  }),
})

export const { useGetItemsQuery, useGetItemByIdQuery } = doApi
