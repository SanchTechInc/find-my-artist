import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSignOutButton } from "@/components/SignOutButton";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <AppSignOutButton />
    </div>
  );
}
