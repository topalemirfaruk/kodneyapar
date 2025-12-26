"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin } from "lucide-react";

export default function ContactPage() {
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
                            <MessageSquare size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                            İletişime Geçin
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Sorularınız, önerileriniz veya işbirliği için bize ulaşın.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">İletişim Bilgileri</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-500">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">E-posta</p>
                                            <p className="text-gray-900 dark:text-white font-medium">info@kodneyapar.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-500">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Konum</p>
                                            <p className="text-gray-900 dark:text-white font-medium">İstanbul, Türkiye</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-600 to-blue-600 text-white shadow-lg">
                                <h3 className="text-2xl font-bold mb-4">Topluluğa Katılın</h3>
                                <p className="text-brand-100 mb-6">
                                    Discord sunucumuza katılarak diğer geliştiricilerle tanışın ve deneyimlerinizi paylaşın.
                                </p>
                                <button className="px-6 py-3 rounded-xl bg-white text-brand-600 font-bold hover:bg-brand-50 transition-colors w-full">
                                    Discord'a Katıl
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
                        >
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Adınız</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" placeholder="Adınız" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Soyadınız</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" placeholder="Soyadınız" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-posta Adresi</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400" placeholder="ornek@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mesajınız</label>
                                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none" placeholder="Mesajınızı buraya yazın..." />
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 group">
                                    <span>Gönder</span>
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
