"use client";

import { useMountedState } from "react-use";

import NewAccountSheet from "@/features/accounts/components/NewAccount";
import EditAccountSheet from "@/features/accounts/components/EditAccount";
import NewCategorySheet from "@/features/categories/components/NewCategorySheet";
import EditCategorySheet from "@/features/categories/components/EditCategorySheet";
import NewTransactionSheet from "@/features/transactions/components/NewTransaction";


export const SheetProvider = () => {

  const isMounted = useMountedState();

  if( !isMounted ) return null;

  return (
    <div>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
    </div>
  );
};
