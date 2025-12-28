"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { trTR } from "@clerk/localizations";

export default function ClerkProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { resolvedTheme } = useTheme();

    return (
        <ClerkProvider
            localization={trTR}
            appearance={{
                baseTheme: resolvedTheme === "dark" ? dark : undefined,
                variables: {
                    colorPrimary: "#3b82f6", // brand-500
                    colorBackground: resolvedTheme === "dark" ? "#0a0a0a" : "#ffffff",
                    colorInputBackground: resolvedTheme === "dark" ? "#171717" : "#f3f4f6",
                    colorText: resolvedTheme === "dark" ? "#ffffff" : "#111827",
                },
                elements: {
                    card: "shadow-xl border border-gray-200 dark:border-white/10",
                    formButtonPrimary: "bg-brand-600 hover:bg-brand-500 text-white",
                    footerActionLink: "text-brand-500 hover:text-brand-400",
                }
            }}
        >
            {children}
        </ClerkProvider>
    );
}
