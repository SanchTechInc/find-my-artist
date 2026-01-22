import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST() {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    if (user.unsafeMetadata.isAdult === undefined) {
        return new NextResponse("User not onboarded", { status: 400 });
    }

    await convex.mutation(api.users.createUserIfMissing, {
        clerkId: user.id,
        displayName:
            user.firstName ||
            user.username ||
            user.primaryEmailAddress?.emailAddress ||
            "User",
        isAdult: Boolean(user.unsafeMetadata.isAdult),
    });

    return NextResponse.json({ ok: true });
}