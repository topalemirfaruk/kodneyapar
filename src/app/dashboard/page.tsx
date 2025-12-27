"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ControlPanel, { AnalysisMode } from "@/components/ControlPanel";
import AnalysisResult from "@/components/AnalysisResult";
import { motion } from "framer-motion";

export default function Dashboard() {
    const [code, setCode] = useState(`// Örnek Kod
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}`);
    const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
    const [mode, setMode] = useState<AnalysisMode>("explain");
    const [language, setLanguage] = useState("javascript");
    const [targetLanguage, setTargetLanguage] = useState("Python");
    const [lineByLine, setLineByLine] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleExplain = async () => {
        if (!code.trim()) return;

        setIsAnalyzing(true);
        setResult(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, level, lineByLine, mode, language, targetLanguage }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || "Analiz sırasında bir hata oluştu.");
            }

            setResult(data);

            // Save to history if user is logged in
            try {
                if (data) {
                    await fetch("/api/history", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            code,
                            mode,
                            result: data
                        })
                    });
                }
            } catch (err) {
                console.error("Failed to save history", err);
            }
        } catch (error: any) {
            console.error("Error:", error);
            alert(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen text-gray-900 dark:text-white selection:bg-brand-500/30 overflow-x-hidden transition-colors duration-300">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            Kod Analiz Paneli
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Kodunuzu yapıştırın, analiz modunu seçin ve yapay zekanın gücünü keşfedin.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <CodeEditor
                                code={code}
                                setCode={setCode}
                                language={language}
                                setLanguage={setLanguage}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-1 space-y-6"
                        >
                            <ControlPanel
                                level={level}
                                setLevel={setLevel}
                                mode={mode}
                                setMode={setMode}
                                lineByLine={lineByLine}
                                setLineByLine={setLineByLine}
                                targetLanguage={targetLanguage}
                                setTargetLanguage={setTargetLanguage}
                                onExplain={handleExplain}
                                isAnalyzing={isAnalyzing}
                            />

                            <div className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm dark:shadow-none">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                                    İpuçları
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0 text-xs">1</div>
                                        <span>Kodu editöre yapıştırın veya yazın.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0 text-xs">2</div>
                                        <span>Seviyenizi seçin (Yeni başlayanlar için daha basit dil).</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 flex-shrink-0 text-xs">3</div>
                                        <span>"Satır satır" seçeneği ile detaylı analiz alın.</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <AnalysisResult result={result} mode={mode} loading={isAnalyzing} />
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
