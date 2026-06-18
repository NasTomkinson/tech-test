import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Logo } from "@/templates/components/logo";
import { Icon } from "@/templates/components/icon";

import { LoginForm } from "./login-form";

export default async function AuthLoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <section className="min-h-screen bg-white text-black md:grid md:grid-cols-[minmax(0,1fr)_minmax(360px,480px)]">
      <div className="relative hidden min-h-screen overflow-hidden bg-primary-dark p-10 text-white md:flex md:flex-col md:justify-between">
        <Logo
          className="relative z-10"
          iconClassName="h-8 w-8 text-primary-light"
          textClassName="text-2xl"
        />

        <div className="relative z-10 max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase text-primary-light">
            Secure access
          </p>
          <h1 className="text-5xl font-bold leading-tight">
            Eagle Bank dashboard
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-primary-light">
            Manage accounts, transactions, and profile details from one banking workspace.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded bg-white/10 p-4">
            <Icon name="mdi:shield-check-outline" className="mb-3 h-6 w-6 text-primary-light" />
            Protected session
          </div>
          <div className="rounded bg-white/10 p-4">
            <Icon name="mdi:bank-outline" className="mb-3 h-6 w-6 text-primary-light" />
            Account overview
          </div>
          <div className="rounded bg-white/10 p-4">
            <Icon name="mdi:receipt-text-outline" className="mb-3 h-6 w-6 text-primary-light" />
            Transactions
          </div>
        </div>

        <Icon
          name="streamline-cyber:origami-paper-bird"
          className="absolute -right-20 top-20 h-96 w-96 text-primary opacity-10"
        />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <Logo
            className="mb-10 text-primary-dark md:hidden"
            iconClassName="h-7 w-7 text-primary"
            textClassName="text-2xl"
          />

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary-dark">
              Sign in
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-dark">
              Use your Eagle Bank credentials to continue.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </section>
  );
}
