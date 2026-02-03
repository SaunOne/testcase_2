import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

// Base API untuk semua endpoints
// Menggunakan fakeBaseQuery untuk demo (dummy data)
// Production: ganti dengan fetchBaseQuery + baseUrl
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Items", "DOLines", "DeliveryOrders", "Inbound", "Inventory", "MasterData"],
  endpoints: () => ({}),
})
