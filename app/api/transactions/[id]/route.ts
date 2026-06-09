import { mockTransactions } from "../../_mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const transaction = mockTransactions.find((item) => item.id === id);

  if (!transaction) {
    return Response.json({ message: "Transaction not found" }, { status: 404 });
  }

  return Response.json({ transaction });
}
