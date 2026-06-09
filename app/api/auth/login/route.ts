import { mockUser } from "../../_mock-data";

export async function POST() {
  return Response.json({
    user: mockUser,
    token: "mock-login-token",
    message: "Login successful",
  });
}
