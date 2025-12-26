"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Clock, Code2, Trash2, ChevronRight, Calendar, Terminal } from "lucide-react";

interface AnalysisHistory {
    id: string;
    code: string;
    mode: string;
    result: any;
    createdAt: string;
}

export default function HistoryPage() {
    const { user, isLoaded } = useUser();
    const [history, setHistory] = useState<AnalysisHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user) {
            fetchHistory();
        }
    }, [isLoaded, user]);

    const fetchHistory = async () => {
        try {
            const response = await fetch("/api/history");
            if (!response.ok) {
                throw new Error("Failed to fetch history");
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setHistory(data);
            } else {
                setHistory([]);
            }
        } catch (error) {
            console.error("Geçmiş yüklenirken hata:", error);
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen text-gray-900 dark:text-white selection:bg-brand-500/30 overflow-x-hidden transition-colors duration-300">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-10"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                Analiz Geçmişi
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Daha önce yaptığınız tüm kod analizleri burada saklanır.
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-500 dark:text-gray-400">
                            <Clock size={16} />
                            <span>Toplam {history.length} analiz</span>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-10 h-10 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
                            <p className="text-gray-500 animate-pulse">Geçmiş yükleniyor...</p>
                        </div>
                    ) : history.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 border-dashed"
                        >
                            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 dark:text-gray-500">
                                <Terminal size={40} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Henüz Analiz Yok</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                                Kod analiz geçmişiniz burada görünecek. İlk analizinizi yapmak için panele gidin.
                            </p>
                            <a href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20">
                                <Code2 size={18} />
                                Analiz Yap
                            </a>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-white/[0.08] transition-all duration-300 hover:shadow-lg dark:hover:shadow-none overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="text-gray-400 dark:text-gray-500" />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Code Preview */}
                                        <div className="w-full md:w-1/3 bg-gray-100 dark:bg-black/30 rounded-xl p-4 font-mono text-xs text-gray-600 dark:text-gray-400 overflow-hidden h-32 relative border border-gray-200 dark:border-white/5">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-black/30 pointer-events-none" />
                                            <pre>{item.code}</pre>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${item.mode === 'explain' ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20' :
                                                        item.mode === 'security' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                                                            'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                                                        }`}>
                                                        {item.mode === 'explain' ? 'Kod Açıklama' : item.mode === 'security' ? 'Güvenlik Analizi' : 'Refactoring'}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                                        <Calendar size={12} />
                                                        {formatDate(item.createdAt)}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                                                    {item.code.split('\n')[0] || 'İsimsiz Kod Parçası'}
                                                </h3>

                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {typeof item.result === 'string'
                                                        ? item.result.substring(0, 150)
                                                        : item.result?.summary || 'Analiz sonucu detayları...'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
