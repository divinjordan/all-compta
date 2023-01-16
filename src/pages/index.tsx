import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { useAccount } from "../models/account";

export default function Home() {
  const account = useAccount((state) => state);
  const router = useRouter();

  useEffect(() => {
    account.fetch();
  }, []);

  function selectAccount(item) {
    account.setCurrent(item);
    router.push("/account");
  }

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Accounts</h3>
          <Link href="/add-account">
            <span className="bg-primary cursor-pointer text-white px-4 py-1.5 text-sm  rounded-md">
              Add account
            </span>
          </Link>
        </div>

        {account.items.map((item, index) => (
          <div
            key={`${index}`}
            onClick={() => selectAccount(item)}
            className="border p-3 mt-4 rounded-md shadow-sm"
          >
            <div> {item.name}</div>
            <div>{item.balance}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
