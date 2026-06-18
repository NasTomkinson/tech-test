import { auth } from "@/auth";

import { getMockUserByEmail, toAuthUserSummary } from "../../_mock-data";

export async function GET() {
  const session = await auth();

  const user = getMockUserByEmail(session?.user?.email);

  if (!user) {
    return Response.json(
      {
        user: null,
        authenticated: false,
      },
      { status: 401 },
    );
  }

  return Response.json({
    user: toAuthUserSummary(user),
    authenticated: true,
  });
}
