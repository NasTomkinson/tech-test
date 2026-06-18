import { auth } from "@/auth";

import {
  getMockAccountsByEmail,
  getMockTransactionsByEmail,
  getMockUserByEmail,
  toAccountSummary,
} from "../_mock-data";

export async function GET() {
  const session = await auth();
  const user = getMockUserByEmail(session?.user?.email);

  if (!user) {
    return Response.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const accounts = getMockAccountsByEmail(user.email).map(toAccountSummary);
  const transactions = getMockTransactionsByEmail(user.email);

  return Response.json({
    accounts,
    transactions,
  });
}
