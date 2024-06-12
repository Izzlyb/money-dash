"use client";

import { useMountedState } from "react-use";

import NewAccountSheet from "@/features/accounts/components/NewAccount";
import EditAccountSheet from "@/features/accounts/components/EditAccount";

export const SheetProvider = () => {

  const isMounted = useMountedState();

  if( !isMounted ) return null;

  return (
    <div>
      <NewAccountSheet />
      <EditAccountSheet />
    </div>
  );
};
