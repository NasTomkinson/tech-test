import { signOut } from "@/auth";

export default function ProfilePage() {
  return (
    <div className="container my-8">
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="btn btn-primary mt-2">Sign out</button>
      </form>
    </div>
  );
}
