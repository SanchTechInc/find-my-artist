import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        return <div>Not Authenticated</div>;
    }

    return <h1>Dashboard</h1>;
}