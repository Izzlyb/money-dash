"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";

export const useGetTransaction = (id?:string) => {

  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery ({
    enabled: !!id,
    queryKey : ['transactions', { id }],
    queryFn : async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if( !response.ok ) {
        throw new Error( "Failed to fetch specified transaction" );
      }

      const { data } = await response.json();

      return data;
    },
  });
  
  return query;

};
