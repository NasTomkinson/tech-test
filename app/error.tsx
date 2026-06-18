"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Logo } from "@/templates/components/logo";
import { Icon } from "@/templates/components/icon";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md text-center">
        <Logo
          className="mb-8 justify-center text-primary-dark"
          iconClassName="h-8 w-8 text-primary"
          textClassName="text-2xl"
        />
        <Icon
          name="mdi:alert-circle-outline"
          className="mx-auto mb-5 h-16 w-16 text-utility-error"
        />
        <p className="mb-2 text-sm font-semibold uppercase text-neutral-dark">
          Error
        </p>
        <h1 className="text-3xl font-bold text-primary-dark">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-dark">
          We could not load this part of Eagle Bank. Try again, or return to the dashboard.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn btn-primary"
          >
            Try again
          </button>
          <Link href="/" className="btn btn-secondary">
            Back to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
