import { auth } from "@/auth";

import {
  getMockAccountsByEmail,
  getMockUserByEmail,
  toAccountSummary,
} from "../_mock-data";

export async function GET() {
  const session = await auth();
  const user = getMockUserByEmail(session?.user?.email);

  if (!user) {
    return Response.json({ message: "Unauthenticated" }, { status: 401 });
  }

  return Response.json({
    accounts: getMockAccountsByEmail(user.email).map(toAccountSummary),
  });
}
