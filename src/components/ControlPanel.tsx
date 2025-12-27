"use strict";
import { Zap, CheckCircle2, AlertCircle, BookOpen, ShieldCheck, RefreshCw, ArrowRightLeft } from "lucide-react";
import { clsx } from "clsx";

export type AnalysisMode = "explain" | "security" | "refactor" | "converter";

interface ControlPanelProps {
    level: "beginner" | "intermediate" | "advanced";
    setLevel: (level: "beginner" | "intermediate" | "advanced") => void;
    mode: AnalysisMode;
    setMode: (mode: AnalysisMode) => void;
    lineByLine: boolean;
    setLineByLine: (val: boolean) => void;
    targetLanguage: string;
    setTargetLanguage: (lang: string) => void;
    onExplain: () => void;
    isAnalyzing: boolean;
}

export default function ControlPanel({
    level,
    setLevel,
    mode,
    setMode,
    lineByLine,
    setLineByLine,
    targetLanguage,
    setTargetLanguage,
    onExplain,
    isAnalyzing,
}: ControlPanelProps) {
    const languages = [
        "Python", "TypeScript", "JavaScript", "Java", "Go", "Rust", "C++", "C#", "PHP", "Swift"
    ];

    const handleModeChange = (newMode: AnalysisMode) => {
        setMode(newMode);
    };

    return (
        <div className="glass-panel rounded-2xl p-4 md:p-6 mb-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex flex-col gap-6">

                {/* Mode Selection */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Mod Seçimi</label>
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-dark-800/50 p-1 rounded-xl border border-gray-200 dark:border-white/5">
                        <button
                            onClick={() => handleModeChange("explain")}
                            className={clsx(
                                "px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                                mode === "explain"
                                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 shadow-sm ring-1 ring-brand-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <BookOpen size={18} />
                            Ne Yapıyor?
                        </button>
                        <button
                            onClick={() => handleModeChange("security")}
                            className={clsx(
                                "px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                                mode === "security"
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <ShieldCheck size={18} />
                            Güvenli mi?
                        </button>
                        <button
                            onClick={() => handleModeChange("refactor")}
                            className={clsx(
                                "px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                                mode === "refactor"
                                    ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 shadow-sm ring-1 ring-purple-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <RefreshCw size={18} />
                            Daha Temiz Yaz
                        </button>
                        <button
                            onClick={() => handleModeChange("converter")}
                            className={clsx(
                                "relative px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                                mode === "converter"
                                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-sm ring-1 ring-orange-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <ArrowRightLeft size={18} />
                            Dönüştürücü
                        </button>
                    </div>
                </div>

                {/* Target Language Selection (Only for Converter mode) */}
                {mode === "converter" && (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Hedef Dil</label>
                        <select
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                        >
                            {languages.map(lang => (
                                <option key={lang} value={lang} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Level Selection (Only for Explain and Converter mode) */}
                <div className={clsx("flex flex-col gap-2 transition-all duration-300", !["explain", "converter"].includes(mode) && "hidden")}>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-400">Anlatım Seviyesi</label>
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-dark-800/50 p-1 rounded-xl border border-gray-200 dark:border-white/5">
                        <button
                            onClick={() => setLevel("beginner")}
                            className={clsx(
                                "px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center justify-center gap-1",
                                level === "beginner"
                                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 shadow-sm ring-1 ring-brand-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <CheckCircle2 size={14} />
                            Başlangıç
                        </button>
                        <button
                            onClick={() => setLevel("intermediate")}
                            className={clsx(
                                "px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center justify-center gap-1",
                                level === "intermediate"
                                    ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 shadow-sm ring-1 ring-yellow-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-current opacity-70" />
                            Orta
                        </button>
                        <button
                            onClick={() => setLevel("advanced")}
                            className={clsx(
                                "px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center justify-center gap-1",
                                level === "advanced"
                                    ? "bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm ring-1 ring-red-500/20"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-white/5"
                            )}
                        >
                            <Zap size={14} />
                            İleri
                        </button>
                    </div>
                </div>

                {/* Options & Action */}
                <div className="flex flex-col gap-4 mt-2">
                    {mode === "explain" && (
                        <label className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className={clsx(
                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                lineByLine ? "bg-brand-500 border-brand-500" : "border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                            )}>
                                {lineByLine && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={lineByLine}
                                onChange={(e) => setLineByLine(e.target.checked)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                Satır satır açıkla
                            </span>
                        </label>
                    )}

                    <button
                        onClick={onExplain}
                        disabled={isAnalyzing}
                        className={clsx(
                            "w-full h-12 px-6 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2",
                            isAnalyzing
                                ? "bg-gray-700 cursor-not-allowed opacity-70"
                                : mode === "security"
                                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
                                    : mode === "refactor"
                                        ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 hover:shadow-purple-500/25"
                                        : mode === "converter"
                                            ? "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 hover:shadow-orange-500/25"
                                            : "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/25",
                            "hover:scale-[1.02] active:scale-[0.98]"
                        )}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                İşleniyor...
                            </>
                        ) : (
                            <>
                                {mode === "converter" ? <ArrowRightLeft size={20} className="text-white" /> : <Zap size={20} className="fill-white" />}
                                {mode === "explain" ? "Analiz Et" : mode === "security" ? "Güvenliği Tara" : mode === "refactor" ? "Refactor Et" : "Dönüştür"}
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
