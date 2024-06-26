"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/UseNewTransaction";


type Props = {};

const TransactionsPage = (props: Props) => {

  const NewTransaction = useNewTransaction();

  // const isDisabled = 
  //   transactionQuery.isLoading ||
  //   deleteTransactions.isPending;

  if( false ) {
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
            Transactions Page
          </CardTitle>
          <Button size="sm" onClick={NewTransaction.onOpen}>
          {/* <Button size="sm" > */}
            <Plus className=" size-4 mr-2 "/>
            Add Transaction
          </Button>
        </CardHeader>
        <CardContent>
          {/* <DataTable 
              filterKey="name"
              columns={columns} 
              data={accounts}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id );
                deleteAccounts.mutate({ ids });
              }}
              disabled={isDisabled}
            /> */}
        </CardContent>
      </Card>
    </div>

  );
};

export default TransactionsPage;
