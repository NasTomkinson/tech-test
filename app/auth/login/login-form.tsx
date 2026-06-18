"use client";

import { useActionState } from "react";

import { Icon } from "@/templates/components/icon";

import { loginAction, type LoginFormState } from "./actions";

const initialState: LoginFormState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="email" className="font-semibold text-primary-dark">
          Email address
        </label>
        <div className="flex h-12 items-center gap-3 rounded border border-neutral-light bg-white px-3 text-primary-dark focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light">
          <Icon name="mdi:email-outline" className="h-5 w-5 shrink-0 text-neutral" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue="jordan.lee@eaglebank.test"
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-neutral"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="password" className="font-semibold text-primary-dark">
          Password
        </label>
        <div className="flex h-12 items-center gap-3 rounded border border-neutral-light bg-white px-3 text-primary-dark focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light">
          <Icon name="mdi:lock-outline" className="h-5 w-5 shrink-0 text-neutral" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            defaultValue="password123"
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-neutral"
          />
        </div>
      </div>

      {state.error ? (
        <p className="rounded border border-utility-error bg-white p-3 text-sm font-medium text-utility-error">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary h-12 w-full gap-2"
      >
        <Icon name="mdi:login" className="h-5 w-5" />
        {pending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
