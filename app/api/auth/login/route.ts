import { getMockUserByCredentials, toAuthUserSummary } from "../../_mock-data";

export async function POST(request: Request) {
  const credentials = (await request.json().catch(() => null)) as {
    email?: unknown;
    password?: unknown;
  } | null;

  const email =
    typeof credentials?.email === "string"
      ? credentials.email.trim().toLowerCase()
      : "";
  const password =
    typeof credentials?.password === "string" ? credentials.password : "";

  const user = getMockUserByCredentials(email, password);

  if (!user) {
    return Response.json(
      {
        message: "Invalid email or password",
      },
      { status: 401 },
    );
  }

  return Response.json({
    user: toAuthUserSummary(user),
    token: "mock-login-token",
    message: "Login successful",
  });
}
