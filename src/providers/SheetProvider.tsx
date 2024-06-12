"use client";

import { useMountedState } from "react-use";

import NewAccountSheet from "@/features/accounts/components/NewAccount";

type Props = {};

export const SheetProvider = (props: Props) => {

  const isMounted = useMountedState();

  if( !isMounted ) return null;

  return (
    <div>
      <NewAccountSheet />
    </div>
  );
};
