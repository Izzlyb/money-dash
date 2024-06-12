"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/UseGetAccounts";
import { useNewAccount } from "@/features/accounts/hooks/UseNewAccount";


export default function Home() {

  const { data: accounts, isLoading } = useGetAccounts();

  const { onOpen } = useNewAccount();

  // if( isLoading ) {
  //   return (
  //     <div>
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <main className="flex min-h-screen p-24 justify-center">
      <div className="w-full max-w-5xl mb-6">
        <div className="m-6">
          <h1>
            Build a Finance SaaS Platform
          </h1>
          <p>
            With Nextjs, React, Honojs with CSV Upload (2024)
          </p>
          <h2>This is an Authenticated Route</h2>

          {/* <div>
            <p>account list</p>
            {accounts?.map((acnt) => (
              <div key={acnt.id}>
                {acnt.name}
              </div>
            ))}
          </div> */}

        </div>
      </div>
    </main>
  );
}
