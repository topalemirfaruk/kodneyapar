"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-30" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Floating Icons */}
            {[
                { label: ".tsx", x: "10%", y: "20%", delay: 0, duration: 8 },
                { label: ".py", x: "85%", y: "15%", delay: 2, duration: 10 },
                { label: ".js", x: "15%", y: "70%", delay: 4, duration: 9 },
                { label: ".css", x: "80%", y: "80%", delay: 1, duration: 11 },
                { label: ".java", x: "5%", y: "45%", delay: 3, duration: 12 },
                { label: ".go", x: "92%", y: "50%", delay: 5, duration: 7 },
                { label: ".rs", x: "20%", y: "10%", delay: 6, duration: 13 },
                { label: ".php", x: "75%", y: "30%", delay: 2.5, duration: 9 },
            ].map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 border border-gray-200/20 dark:border-white/10 backdrop-blur-sm select-none"
                    style={{ left: item.x, top: item.y }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay
                    }}
                >
                    <Code2 size={20} className="text-brand-500/70" />
                    <span className="font-mono font-bold text-lg text-gray-400 dark:text-gray-300">{item.label}</span>
                </motion.div>
            ))}
        </div>
    );
}
