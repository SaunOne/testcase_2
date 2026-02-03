import { baseApi } from './baseApi'
import type { MasterItem } from '../../features/delivery-order/types/do.types'
import itemsData from '../../data/items.json'

export const doApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<MasterItem[], void>({
      queryFn: () => {
        return { data: itemsData as MasterItem[] }
      },
      providesTags: ['Items'],
    }),
    getItemById: builder.query<MasterItem | undefined, string>({
      queryFn: (id) => {
        const item = (itemsData as MasterItem[]).find((i) => i.id === id)
        return { data: item }
      },
      providesTags: (_result, _error, id) => [{ type: 'Items', id }],
    }),
  }),
})

export const { useGetItemsQuery, useGetItemByIdQuery } = doApi
