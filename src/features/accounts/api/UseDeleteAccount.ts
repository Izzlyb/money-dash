
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = ( id?: string ) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
      ResponseType,
      Error

    > ({
    mutationFn: async (json) => {
      console.log(
        "in useEditAccount to call .patch(id) endpoint with id and userId...",
        id
      );
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id }
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({ queryKey: ["account", { id }]})
      queryClient.invalidateQueries({ queryKey: ["accounts"]})
      // TODO: invalidate summary and transactions:
    },
    onError: () => {
      toast.error("Failed to delete account");
    }
  });

  return mutation;
}
