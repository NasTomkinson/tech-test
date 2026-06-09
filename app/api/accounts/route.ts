import { mockAccounts } from "../_mock-data";

export async function GET() {
  return Response.json({
    accounts: mockAccounts,
  });
}
