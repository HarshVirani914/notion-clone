import { baseAPI } from "@/store/baseApi";

export const docuemntApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDocument: builder.query({
      query: (id: string) => `document/${id}`
    }),
    createDocument: builder.mutation({
      query: (payload: { id: string, document: Record<string, any>[] }) => ({
        url: `document/${payload.id}`,
        method: "POST",
        body: payload.document
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          //TODO add data to the store

          console.log("document created", data);

          return data;
        } catch (e) {
          console.log("error while creating document", e);
        }
      }
    }),
    updateDocument: builder.mutation({
      query: (data: { id: string; title: string }) => ({
        url: `document/${data.id}`,
        method: "PUT",
        body: data
      })
    }),
    deleteDocument: builder.mutation({
      query: (id: string) => ({
        url: `document/${id}`,
        method: "DELETE"
      })
    })
  })
})

export const { useCreateDocumentMutation, useGetDocumentQuery } = docuemntApi;