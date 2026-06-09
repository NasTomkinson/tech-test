import { mockAccounts } from "../../_mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const account = mockAccounts.find((item) => item.id === id);

  if (!account) {
    return Response.json({ message: "Account not found" }, { status: 404 });
  }

  return Response.json({ account });
}
