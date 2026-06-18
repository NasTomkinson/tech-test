import { auth } from "@/auth";

import { getMockTransactionsByEmail, getMockUserByEmail } from "../../_mock-data";

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

  const transaction = getMockTransactionsByEmail(user.email).find(
    (item) => item.id === id,
  );

  if (!transaction) {
    return Response.json({ message: "Transaction not found" }, { status: 404 });
  }

  return Response.json({ transaction });
}
