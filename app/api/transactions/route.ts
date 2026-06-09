import { mockTransactions } from "../_mock-data";

export async function GET() {
  return Response.json({
    transactions: mockTransactions,
    pagination: {
      page: 1,
      pageSize: 10,
      total: mockTransactions.length,
    },
  });
}
