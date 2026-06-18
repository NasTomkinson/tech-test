import Link from "next/link";

import { Logo } from "@/templates/components/logo";
import { Icon } from "@/templates/components/icon";

export default function NotFound() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md text-center">
        <Logo
          className="mb-8 justify-center text-primary-dark"
          iconClassName="h-8 w-8 text-primary"
          textClassName="text-2xl"
        />
        <Icon
          name="mdi:map-marker-question-outline"
          className="mx-auto mb-5 h-16 w-16 text-primary"
        />
        <p className="mb-2 text-sm font-semibold uppercase text-neutral-dark">
          404
        </p>
        <h1 className="text-3xl font-bold text-primary-dark">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-dark">
          The page you are looking for is unavailable or may have moved.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to dashboard
        </Link>
      </div>
    </section>
  );
}
