
"use client";

import { Loader2, Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/UseNewAccount";
import { useGetAccounts } from "@/features/accounts/api/UseGetAccounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/UseBulkDeleteAccounts";

import { DataTable } from "@/components/data-table";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import { columns } from "./columns"

type Props = {};

const AccountsPage = (props: Props) => {

  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const deleteAccounts = useBulkDeleteAccounts();

  const isDisabled = 
    accountsQuery.isLoading ||
    deleteAccounts.isPending;

  if( accountsQuery.isLoading ) {
    return (
      <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ">
        <Card className=" border-none drop-shadow-sm " >
          <CardHeader >
            <Skeleton className=" h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className=" h-[500px] w-full flex items-center justify-center">
              <Loader2 className=" size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>          
        </Card>
      </div>
    )
  }

  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className=" border-none drop-shadow-sm " >
        <CardHeader className=" gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" text-xl line-clamp-1">
            Accounts Page
          </CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className=" size-4 mr-2 "/>
            Add Account
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable 
              filterKey="name"
              columns={columns} 
              data={accounts}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id );
                deleteAccounts.mutate({ ids });
              }}
              disabled={isDisabled}
            />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
