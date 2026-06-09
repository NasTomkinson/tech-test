import { mockUser } from "../../_mock-data";

export async function POST() {
  return Response.json(
    {
      user: mockUser,
      token: "mock-register-token",
      message: "Registration successful",
    },
    { status: 201 },
  );
}
