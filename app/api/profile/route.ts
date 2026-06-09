import { mockUser } from "../_mock-data";

export async function GET() {
  return Response.json({
    profile: mockUser,
  });
}

export async function PUT() {
  return Response.json({
    profile: mockUser,
    message: "Profile updated",
  });
}
