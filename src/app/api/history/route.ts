import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { code, mode, result } = await request.json();

        const analysis = await prisma.analysis.create({
            data: {
                userId,
                code,
                mode,
                result: JSON.stringify(result),
            },
        });

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("History Save Error:", error);
        return NextResponse.json({ error: "Failed to save history" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const history = await prisma.analysis.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        // Parse JSON result back to object
        const parsedHistory = history.map((item) => ({
            ...item,
            result: JSON.parse(item.result),
        }));

        return NextResponse.json(parsedHistory);
    } catch (error) {
        console.error("History Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
