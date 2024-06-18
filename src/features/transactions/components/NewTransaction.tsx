
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { insertTransactionSchema } from "@/db/schema";

import { TransactionForm } from "@/features/transactions/components/TransactionsForm";
import { useNewTransaction } from "@/features/transactions/hooks/UseNewTransaction";
import { useCreateTransaction } from "@/features/transactions/api/UseCreateTransaction";

import { useCreateCategory } from "@/features/categories/api/UseCreateCategory";
import { useGetCategories } from "@/features/categories/api/UseGetCategories";

import { useCreateAccount } from "@/features/accounts/api/UseCreateAccount";
import { useGetAccounts } from "@/features/accounts/api/UseGetAccounts";

import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";


const formSchema = insertTransactionSchema.omit({
  id: true,
  });

type FormValues = z.input<typeof formSchema>;

type Props = {};

const NewTransactionSheet = (props: Props) => {

  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => categoryMutation.mutate(
    { name }
  );
  const categoryOptions = (categoryQuery.data ?? []).map((cat) => ({
    label: cat.name,
    value: cat.id
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate(
    { name }
  );
  const accountOptions = (accountQuery.data ?? []).map((acnt) => ({
    label: acnt.name,
    value: acnt.id
  }));

  const isPending = 
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = 
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (values: FormValues ) => {
    createMutation.mutate(values, {
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
            New Transaction
          </SheetTitle>
          <SheetDescription>
            Add a new Transaction
          </SheetDescription>
        </SheetHeader>
        {isLoading
          ? (
            <div className=" absolute inset-0 flex items-center justify-center">
              <Loader2 className=" size-4 text-muted-foreground animate-spin"/>
            </div>
          ) : (
            <TransactionForm
                onSubmit={onSubmit}
                disabled={isPending}
                categoryOptions={categoryOptions}
                onCreateCategory={onCreateCategory}
                accountOptions={accountOptions}
                onCreateAccount={onCreateAccount}
              />
          )
        }
      </SheetContent>
    </Sheet>
  );
};

export default NewTransactionSheet;