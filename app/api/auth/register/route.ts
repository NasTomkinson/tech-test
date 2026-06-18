import { mockUser, toAuthUserSummary } from "../../_mock-data";

export async function POST() {
  return Response.json(
    {
      user: toAuthUserSummary(mockUser),
      token: "mock-register-token",
      message: "Registration successful",
    },
    { status: 201 },
  );
}
