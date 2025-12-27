"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { FileText, List, AlertTriangle, Lightbulb, ShieldAlert, Check, Copy, ArrowRightLeft, Activity, Beaker, Download } from "lucide-react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

interface AnalysisResultProps {
    result: {
        summary: string;
        details: string;
        lineByLine?: string[];
        errors?: string[];
        improvements?: string[];
        securityReport?: {
            level: "low" | "medium" | "high" | "critical";
            issues: string[];
        };
        refactoredCode?: string;
        convertedCode?: string;
        timeComplexity?: string;
        spaceComplexity?: string;
        explanation?: string;
        testCode?: string;
    } | null;
    mode: "explain" | "security" | "refactor" | "converter" | "complexity" | "test-gen";
    loading?: boolean;
}

export default function AnalysisResult({ result, mode }: AnalysisResultProps) {
    const [activeTab, setActiveTab] = useState<string>("general");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (mode === "security") setActiveTab("security");
        else if (mode === "refactor") setActiveTab("refactor");
        else if (mode === "converter") setActiveTab("converter");
        else if (mode === "complexity") setActiveTab("complexity");
        else if (mode === "test-gen") setActiveTab("test-gen");
        else setActiveTab("general");
    }, [mode, result]);

    const handleCopy = () => {
        const textToCopy = result?.refactoredCode || result?.convertedCode || result?.testCode;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (!result) return;

        let content = `# Kod Analiz Raporu\n\n`;
        content += `## Özet\n${result.summary}\n\n`;
        content += `## Detaylar\n${result.details}\n\n`;

        if (result.securityReport) {
            content += `## Güvenlik Raporu (${result.securityReport.level})\n`;
            result.securityReport.issues.forEach((issue, i) => {
                content += `- ${issue}\n`;
            });
            content += `\n`;
        }

        if (result.refactoredCode) {
            content += `## Refactored Kod\n\`\`\`\n${result.refactoredCode}\n\`\`\`\n\n`;
        }

        if (result.convertedCode) {
            content += `## Dönüştürülmüş Kod\n\`\`\`\n${result.convertedCode}\n\`\`\`\n\n`;
        }

        if (result.timeComplexity) {
            content += `## Karmaşıklık Analizi\n`;
            content += `- Zaman: ${result.timeComplexity}\n`;
            content += `- Alan: ${result.spaceComplexity}\n`;
            content += `\n${result.explanation}\n\n`;
        }

        if (result.testCode) {
            content += `## Test Kodu\n\`\`\`\n${result.testCode}\n\`\`\`\n\n`;
        }

        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `kodneyapar-analiz-${new Date().getTime()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!result) return null;

    const tabs = [
        { id: "general", label: "Genel Bakış", icon: FileText, show: mode === "explain" },
        { id: "lines", label: "Satır Satır", icon: List, show: mode === "explain" },
        { id: "errors", label: "Hatalar", icon: AlertTriangle, show: mode === "explain" },
        { id: "improvements", label: "İyileştirmeler", icon: Lightbulb, show: mode === "explain" },
        { id: "security", label: "Güvenlik Raporu", icon: ShieldAlert, show: mode === "security" },
        { id: "refactor", label: "Refactored Kod", icon: FileText, show: mode === "refactor" },
        { id: "converter", label: "Dönüştürülmüş Kod", icon: ArrowRightLeft, show: mode === "converter" },
        { id: "complexity", label: "Karmaşıklık Analizi", icon: Activity, show: mode === "complexity" },
        { id: "test-gen", label: "Test Kodları", icon: Beaker, show: mode === "test-gen" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl overflow-hidden mt-6"
        >
            <div className="border-b border-white/10 bg-white/5 px-2 flex items-center justify-between">
                <div className="flex gap-1 overflow-x-auto">
                    {tabs.filter(t => t.show).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                activeTab === tab.id
                                    ? "border-brand-500 text-brand-400"
                                    : "border-transparent text-gray-400 hover:text-gray-200"
                            )}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleDownload}
                    className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Sonucu İndir"
                >
                    <Download size={16} />
                    <span className="hidden sm:inline">İndir</span>
                </button>
            </div>

            <div className="p-6 min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* ... existing tabs ... */}
                        {activeTab === "general" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Bu Kod Ne Yapıyor?</h3>
                                    <p className="text-gray-300 leading-relaxed">{result.summary}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Nasıl Çalışıyor?</h3>

                                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                                        <ReactMarkdown
                                            components={{
                                                p: ({ node, ...props }) => <p className="mb-4 text-gray-300" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                                                li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                                                strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
                                                code: ({ node, ...props }) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-300 font-mono text-sm" {...props} />,
                                            }}
                                        >
                                            {result.details}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "lines" && (
                            <div className="space-y-4">
                                {result.lineByLine && result.lineByLine.length > 0 ? (
                                    result.lineByLine.map((line, index) => (
                                        <div key={index} className="flex gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                            <span className="font-mono text-brand-500/50 text-sm w-6 pt-1">{index + 1}</span>
                                            <p className="text-gray-300 text-sm">{line}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <List size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>Satır satır açıklama modu kapalıydı veya bu kod için mevcut değil.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "errors" && (
                            <div className="space-y-4">
                                {result.errors && result.errors.length > 0 ? (
                                    result.errors.map((error, index) => (
                                        <div key={index} className="flex gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <AlertTriangle size={20} className="text-red-400 shrink-0" />
                                            <p className="text-red-200 text-sm">{error}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-green-500/50">
                                        <CheckCircle2 size={48} className="mb-4 opacity-50" />
                                        <p className="text-green-400 font-medium">Harika! Kritik bir hata bulunamadı.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "improvements" && (
                            <div className="space-y-4">
                                {result.improvements && result.improvements.length > 0 ? (
                                    result.improvements.map((imp, index) => (
                                        <div key={index} className="flex gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                            <Lightbulb size={20} className="text-yellow-400 shrink-0" />
                                            <p className="text-yellow-200 text-sm">{imp}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <p>Şu an için öneri bulunmuyor.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-6">
                                {result.securityReport ? (
                                    <>
                                        <div className={clsx(
                                            "p-4 rounded-xl border flex items-center gap-4",
                                            result.securityReport.level === "critical" ? "bg-red-500/10 border-red-500/30 text-red-200" :
                                                result.securityReport.level === "high" ? "bg-orange-500/10 border-orange-500/30 text-orange-200" :
                                                    result.securityReport.level === "medium" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-200" :
                                                        "bg-green-500/10 border-green-500/30 text-green-200"
                                        )}>
                                            <ShieldAlert size={32} />
                                            <div>
                                                <h4 className="font-bold text-lg">Güvenlik Riski: {result.securityReport.level.toUpperCase()}</h4>
                                                <p className="text-sm opacity-80">Kodunuzda {result.securityReport.issues.length} adet potansiyel güvenlik açığı tespit edildi.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {result.securityReport.issues.map((issue, idx) => (
                                                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                                    <span className="text-red-400 font-mono text-sm">[{idx + 1}]</span>
                                                    <p className="text-gray-300 text-sm">{issue}</p>
                                                </div>
                                            ))}
                                            {result.securityReport.issues.length === 0 && (
                                                <div className="text-center py-8 text-green-400">
                                                    <CheckCircle2 size={40} className="mx-auto mb-2 opacity-80" />
                                                    <p>Güvenlik açığı bulunamadı.</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-400">Güvenlik raporu oluşturulamadı.</p>
                                )}
                            </div>
                        )}

                        {(activeTab === "refactor" || activeTab === "converter" || activeTab === "test-gen") && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white">
                                        {activeTab === "converter" ? "Dönüştürülmüş Kod" : activeTab === "test-gen" ? "Test Kodu" : "Önerilen Kod"}
                                    </h3>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                                    >
                                        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                        {copied ? "Kopyalandı" : "Kopyala"}
                                    </button>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-white/10 h-[400px]">
                                    <Editor
                                        height="100%"
                                        defaultLanguage="javascript"
                                        value={
                                            activeTab === "converter" ? (result.convertedCode || "// Kod dönüştürülemedi.") :
                                                activeTab === "test-gen" ? (result.testCode || "// Test kodu oluşturulamadı.") :
                                                    (result.refactoredCode || "// Refactor edilmiş kod buraya gelecek...")
                                        }
                                        theme="vs-dark"
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            fontFamily: "var(--font-jetbrains-mono)",
                                            padding: { top: 20 },
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "complexity" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-pink-500/10 border border-pink-500/20 p-6 rounded-xl text-center">
                                        <h4 className="text-pink-400 font-medium mb-2">Zaman Karmaşıklığı</h4>
                                        <div className="text-3xl font-bold text-white">{result.timeComplexity || "N/A"}</div>
                                    </div>
                                    <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-xl text-center">
                                        <h4 className="text-purple-400 font-medium mb-2">Alan Karmaşıklığı</h4>
                                        <div className="text-3xl font-bold text-white">{result.spaceComplexity || "N/A"}</div>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <h4 className="text-lg font-semibold text-white mb-3">Detaylı Analiz</h4>
                                    <p className="text-gray-300 leading-relaxed">{result.explanation}</p>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function CheckCircle2({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
