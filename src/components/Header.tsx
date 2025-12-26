import { Code2 } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-all group-hover:bg-brand-500 group-hover:text-white">
                        <Code2 size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Kod<span className="text-brand-500">NeYapar?</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">
                        Nasıl Çalışır?
                    </Link>
                    <SignedIn>
                        <Link href="/dashboard" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">
                            Analiz Yap
                        </Link>
                        <Link href="/history" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">
                            Geçmiş
                        </Link>
                    </SignedIn>
                    <Link href="/#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">
                        Özellikler
                    </Link>
                    <Link href="/#faq" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white transition-colors">
                        SSS
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="hidden md:flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                Giriş Yap
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="h-9 items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20">
                                Ücretsiz Dene
                            </button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border border-gray-200 dark:border-white/10"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
