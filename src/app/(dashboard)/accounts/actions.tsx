
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useOpenAccount } from "@/features/accounts/hooks/UseOpenAccount";
import { useDeleteAccount } from "@/features/accounts/api/UseDeleteAccount";

import { UseConfirm } from "@/hooks/UseConfirm";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {

  const {onOpen} = useOpenAccount();
  const deleteMutation = useDeleteAccount(id);

  const [ConfirmDialog, confirm] = UseConfirm(
    "Are you sure?",
    "You want to delete this account?"
  )

  const handleDelete = async () => {
    const ok = await confirm();

    if( ok ) {
      deleteMutation.mutate();
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" size-8 p-0">
            <MoreHorizontal className=" size-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
              disabled={deleteMutation.isPending}
              onClick={() => onOpen(id)}
            >
            <Edit className=" size-4 mr-2"/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
            <Trash className=" size-4 mr-2"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

