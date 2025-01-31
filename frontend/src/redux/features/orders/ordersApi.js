//orderApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";


const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials:'include',
            })
        }),
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
            }),
            providesTags: ['Orders']
        }),
        getSingleOrderByEmail: builder.query({
            query: (email, id) => ({
                url: `/email/${email}/${id}`,
            }),
            providesTags: ['order']
        }),
    })    
})

export const { useCreateOrderMutation, useGetOrdersByEmailQuery, useGetSingleOrderByEmailQuery, } = ordersApi;

export default ordersApi;