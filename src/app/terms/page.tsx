"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, Ban } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen text-gray-900 dark:text-white selection:bg-brand-500/30 overflow-x-hidden transition-colors duration-300">
            <Header />

            <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-500 mb-6">
                            <FileText size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            Kullanım Şartları
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Hizmetlerimizi kullanırken uymanız gereken kurallar.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {[
                            {
                                icon: Scale,
                                title: "Hizmet Kullanımı",
                                content: "KodNeYapar hizmetlerini yalnızca yasal amaçlarla kullanabilirsiniz. Sisteme zarar verecek, aşırı yük bindirecek veya diğer kullanıcıların deneyimini olumsuz etkileyecek eylemlerden kaçınmalısınız."
                            },
                            {
                                icon: AlertCircle,
                                title: "Sorumluluk Reddi",
                                content: "Yapay zeka tarafından üretilen analizler ve öneriler tavsiye niteliğindedir. Kodlarınızda yapacağınız değişikliklerin sorumluluğu tamamen size aittir. KodNeYapar, olası hatalardan sorumlu tutulamaz."
                            },
                            {
                                icon: Ban,
                                title: "Yasaklı İçerik",
                                content: "Zararlı yazılım, virüs veya kötü amaçlı kod analizi yapmak veya bunları yaymak amacıyla sistemimizi kullanmak kesinlikle yasaktır. Bu tür eylemler hesabınızın kapatılmasına neden olabilir."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.08] transition-colors shadow-sm dark:shadow-none"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-500 flex-shrink-0">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 text-center text-gray-500 dark:text-gray-500 text-sm"
                    >
                        Son güncelleme: 26 Aralık 2024
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
