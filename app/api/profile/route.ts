import { auth } from "@/auth";

import { getMockUserByEmail, toUserProfile } from "../_mock-data";

export async function GET() {
  const session = await auth();
  const user = getMockUserByEmail(session?.user?.email);

  if (!user) {
    return Response.json(
      {
        message: "Unauthenticated",
      },
      { status: 401 },
    );
  }

  return Response.json({
    profile: toUserProfile(user),
  });
}

export async function PUT() {
  const session = await auth();
  const user = getMockUserByEmail(session?.user?.email);

  if (!user) {
    return Response.json(
      {
        message: "Unauthenticated",
      },
      { status: 401 },
    );
  }

  return Response.json({
    profile: toUserProfile(user),
    message: "Profile updated",
  });
}
