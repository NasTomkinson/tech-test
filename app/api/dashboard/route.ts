import { auth } from "@/auth";

import { getMockDashboardByEmail, toDashboardResponse } from "../_mock-data";

export async function GET() {
  const session = await auth();
  const dashboard = getMockDashboardByEmail(session?.user?.email);

  if (!dashboard) {
    return Response.json(
      {
        message: "Unauthenticated",
      },
      { status: 401 },
    );
  }

  return Response.json(toDashboardResponse(dashboard));
}
