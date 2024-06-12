
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";

import { insertAccountsSchema } from "@/db/schema";
import { UseConfirm } from "@/hooks/UseConfirm";

import { AccountForm } from "@/features/accounts/components/AccountForm";
import { useGetAccount } from "@/features/accounts/api/UseGetAccount";
import { useOpenAccount } from "@/features/accounts/hooks/UseOpenAccount";
import { useEditAccount } from "@/features/accounts/api/UseEditAccount";
import { useDeleteAccount } from "@/features/accounts/api/UseDeleteAccount";

const formSchema = insertAccountsSchema.pick({
  name: true,
  });

type FormValues = z.input<typeof formSchema>;

type Props = {};

const EditAccountSheet = (props: Props) => {

  const { isOpen, onClose, id } = useOpenAccount();
  const accountQuery = useGetAccount( id );
  const editMutation = useEditAccount( id );
  const deleteMutation = useDeleteAccount( id );

  const [DeleteConfirmDialog, confirm] = UseConfirm(
    "Are you sure?",
    "You want to delete this account?"
  )

  const isLoading = accountQuery.isLoading;
  const isPending = 
      editMutation.isPending || 
      deleteMutation.isPending;

  const onSubmit = (values: FormValues ) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if( ok ) {
      deleteMutation.mutate( undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  const defaultValues = accountQuery.data ? {
    name: accountQuery.data.name
  } : {
    name: ""
  };

  return (
    <>
      <DeleteConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className=" space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Account
            </SheetTitle>
            <SheetDescription>
              Edit an existing account
            </SheetDescription>
          </SheetHeader>
          {isLoading 
            ? (
              <div className=" absolute inset-0 flex items-center justify-center">
                <Loader2 className=" size-4 text-muted-foreground animate-spin " />
              </div>
            ) : (
              <AccountForm 
                  id={id}
                  onSubmit={onSubmit} 
                  disabled={isPending} 
                  defaultValues = {defaultValues}
                  onDelete={onDelete}
                /> 
            )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditAccountSheet;
