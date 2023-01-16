import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { Account, getAccounts, useAccount } from "../models/account";
import { useErrors, useLoading, useNotifs } from "../store/interact";
import { HiX } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import Joi from "joi";
import Loading from "../components/interact/loading";
import Errors from "../components/interact/errors";
import Notifs from "../components/interact/notifs";

export default function Home() {
  const [form, setForm] = useState<Partial<Account>>({});

  const errors = useErrors((state) => state);
  const loading = useLoading((state) => state);
  const notifs = useNotifs((state) => state);

  const account = useAccount((state) => state);

  const router = useRouter();

  const formSchema = Joi.object({
    name: Joi.required().messages({
      "any.required": "The name of the account is required",
    }),
    balance: Joi.number(),
  });

  function handleChange(e) {
    setForm((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  async function submit() {
    // Validate an display error.

    errors.reset();
    const validator = formSchema.validate(form);
    if (validator.hasOwnProperty("error")) {
      validator.error.details.forEach((errorItem) => {
        errors.set(errorItem.context.key, errorItem.message);
      });
      return 0;
    }

    loading.start("submit");
    account
      .add(form)
      .then(() => {
        notifs.set("success", "Account add with success");
      })
      .catch((error) => errors.catch(error))
      .finally(() => {
        loading.stop("submit");
      });
  }

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Add account</h3>
          <Link href="/">
            <span className="cursor-pointer bg-white px-4 py-1.5 text-sm  rounded-md">
              <HiX className="w-5 h-5" />
            </span>
          </Link>
        </div>

        <div className="mt-4">
          <div>
            <Errors />
            <Notifs />
          </div>
          <div>
            <label htmlFor="" className="block mb-2 font-medium">
              Account Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="px-4 py-1.5 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="block mb-2 font-medium">
              Account Balance
            </label>
            <input
              type="text"
              name="balance"
              onChange={handleChange}
              className="px-4 py-1.5 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            onClick={submit}
            className="mt-4 bg-primary cursor-pointer text-white px-4 py-1.5  rounded-md"
          >
            <Loading item="submit" text="Add account" alt="Adding..." />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
