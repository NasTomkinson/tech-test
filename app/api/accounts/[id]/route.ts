import { auth } from "@/auth";

import {
  getMockAccountsByEmail,
  getMockTransactionsByEmail,
  getMockUserByEmail,
  toAccountSummary,
} from "../../_mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth();
  const user = getMockUserByEmail(session?.user?.email);

  if (!user) {
    return Response.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const account = getMockAccountsByEmail(user.email).find(
    (item) => item.id === id,
  );

  if (!account) {
    return Response.json({ message: "Account not found" }, { status: 404 });
  }

  const transactions = getMockTransactionsByEmail(user.email).filter(
    (transaction) => transaction.accountID === id,
  );

  return Response.json({
    account: toAccountSummary(account),
    transactions,
  });
}
