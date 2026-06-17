import { mockAccounts, mockTransactions } from "../../../_mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const account = mockAccounts.find((item) => item.id === id);

  if (!account) {
    return Response.json({ message: "Account not found" }, { status: 404 });
  }

  const transactions = mockTransactions.filter(
    (transaction) => transaction.accountID === id,
  );

  return Response.json({
    account,
    transactions,
    pagination: {
      page: 1,
      pageSize: transactions.length,
      total: transactions.length,
    },
  });
}
