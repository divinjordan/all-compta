import MainLayout from "../components/layouts/main-layout";
import { useAccount } from "../models/account";
import { HiX } from "react-icons/hi";
import Link from "next/link";

export default function Home() {
  const account = useAccount((state) => state);
  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Account details</h3>
          <Link href="/">
            <span className="cursor-pointer bg-white px-4 py-1.5 text-sm  rounded-md">
              <HiX className="w-5 h-5" />
            </span>
          </Link>
        </div>

        <div className="mt-4 border p-4">
          <div>
            <strong>Name:</strong> {account.current.name}
          </div>
          <div>
            <strong>Balance:</strong> {account.current.balance}
          </div>
        </div>

        <div className="mt-4 border p-4">
          <h3 className="font-medium">Transactions</h3>
        </div>
        <div className="mt-4 border p-4">
          <h3 className="font-medium">Transferts</h3>
        </div>
      </div>
    </MainLayout>
  );
}
