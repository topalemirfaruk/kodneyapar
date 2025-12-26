"use client";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    language?: string;
    setLanguage?: (lang: string) => void;
}

const LANGUAGES = [
    { id: "javascript", name: "JavaScript", ext: "js" },
    { id: "typescript", name: "TypeScript", ext: "ts" },
    { id: "python", name: "Python", ext: "py" },
    { id: "java", name: "Java", ext: "java" },
    { id: "csharp", name: "C#", ext: "cs" },
    { id: "cpp", name: "C++", ext: "cpp" },
    { id: "go", name: "Go", ext: "go" },
    { id: "rust", name: "Rust", ext: "rs" },
    { id: "php", name: "PHP", ext: "php" },
    { id: "html", name: "HTML", ext: "html" },
    { id: "css", name: "CSS", ext: "css" },
    { id: "sql", name: "SQL", ext: "sql" },
];

export default function CodeEditor({ code, setCode, language = "javascript", setLanguage }: CodeEditorProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const currentLang = LANGUAGES.find(l => l.id === language) || LANGUAGES[0];

    useEffect(() => {
        setMounted(true);
    }, []);

    const editorTheme = mounted && (theme === "dark" || resolvedTheme === "dark") ? "vs-dark" : "light";

    return (
        <div className="glass-panel rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl h-[500px] flex flex-col bg-white dark:bg-[#1e1e1e]">
            <div className="bg-gray-50 dark:bg-dark-800/80 border-b border-gray-200 dark:border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="ml-3 text-xs font-mono text-gray-500">editor.{currentLang.ext}</span>
                </div>

                {setLanguage && (
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded px-2 py-1 text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.id} value={lang.id} className="bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-300">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                )}
                {!setLanguage && (
                    <div className="text-xs text-gray-500 font-medium px-2 py-1 rounded bg-gray-100 dark:bg-white/5">
                        {language.toUpperCase()}
                    </div>
                )}
            </div>
            <div className="flex-1 relative">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme={editorTheme}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        fontFamily: "var(--font-jetbrains-mono)",
                        padding: { top: 20 },
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        formatOnPaste: true,
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}
