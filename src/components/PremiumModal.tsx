import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, Star } from "lucide-react";
import { useState } from "react";

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/stripe/checkout", {
                method: "POST"
            });

            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error("STRIPE_CLIENT_ERROR", error);
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                    >
                        <div className="relative bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 shadow-2xl overflow-hidden">
                            {/* Background Effects */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Content */}
                            <div className="relative text-center space-y-6">
                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 rotate-3">
                                    <Star size={32} className="text-white fill-white" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Premium'a Geçin</h2>
                                    <p className="text-gray-400">
                                        Kod dönüştürücü ve diğer gelişmiş özellikleri kullanmak için Premium plana yükseltin.
                                    </p>
                                </div>

                                <div className="space-y-3 text-left bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check size={12} className="text-green-400" />
                                        </div>
                                        <span className="text-sm">Sınırsız Kod Dönüştürme</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check size={12} className="text-green-400" />
                                        </div>
                                        <span className="text-sm">Gelişmiş Güvenlik Taraması</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check size={12} className="text-green-400" />
                                        </div>
                                        <span className="text-sm">VS Code Eklentisi</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubscribe}
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Zap size={20} className="fill-white" />
                                    )}
                                    Premium Üye Ol
                                </button>

                                <p className="text-xs text-gray-500">
                                    İstediğiniz zaman iptal edebilirsiniz.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
