import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";

const DAY_IN_MS = 86_400_000;

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId,
            },
            select: {
                stripeSubscriptionId: true,
                stripeCurrentPeriodEnd: true,
                stripeCustomerId: true,
                stripePriceId: true,
            },
        });

        if (!userSubscription) {
            return NextResponse.json({ isPremium: false });
        }

        const isValid =
            userSubscription.stripePriceId &&
            userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

        return NextResponse.json({
            isPremium: !!isValid
        });

    } catch (error) {
        console.log("[SUBSCRIPTION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
