
import { z } from "zod";

import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";

import { insertAccountsSchema } from "@/db/schema";

import { AccountForm } from "@/features/accounts/components/AccountForm";
import { useNewAccount } from "@/features/accounts/hooks/UseNewAccount";
import { useCreateAccount } from "@/features/accounts/api/UseCreateAccount";


const formSchema = insertAccountsSchema.pick({
  name: true,
  });

type FormValues = z.input<typeof formSchema>;

type Props = {};

const NewAccountSheet = (props: Props) => {

  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className=" space-y-4">
        <SheetHeader>
          <SheetTitle>
            New Account
          </SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm 
            onSubmit={onSubmit} 
            disabled={mutation.isPending} 
            defaultValues = {{
              name: ""
            }}
          /> 
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountSheet;
