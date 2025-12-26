"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { ArrowRight, Code2, Sparkles, Terminal, ShieldCheck, Zap, CheckCircle2, Cpu } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white selection:bg-brand-500/30 overflow-x-hidden transition-colors duration-300">
      <Header />

      {/* Background Effects */}
      <main className="pt-32 relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-8">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Yapay Zeka Destekli Kod Analizi</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900 dark:text-white">
              Kodunuzu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-blue-500">Anlayan</span><br />
              Asistanınız.
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Saniyeler içinde kodunuzu analiz edin, hataları bulun ve iyileştirme önerileri alın.
              Junior geliştiriciler için mükemmel bir öğrenme aracı.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-14 px-8 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/25 hover:scale-105 flex items-center gap-2">
                    Hemen Başla <ArrowRight size={20} />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <button className="h-14 px-8 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/25 hover:scale-105 flex items-center gap-2">
                    Panele Git <ArrowRight size={20} />
                  </button>
                </Link>
              </SignedIn>

              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 px-8 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 backdrop-blur-sm flex items-center gap-2"
              >
                <Terminal size={20} className="text-gray-500 dark:text-gray-400" />
                Nasıl Çalışır?
              </button>
            </div>
          </motion.div>

          {/* 3D Mockup / Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-600 rounded-2xl blur opacity-20 dark:opacity-30" />
            <div className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs text-gray-500 font-mono">analysis_result.tsx</div>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-white/10 rounded animate-pulse" />
                  <div className="h-32 w-full bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 p-4 font-mono text-sm text-gray-400">
                    <span className="text-purple-500">function</span> <span className="text-blue-500">calculateTotal</span>(items) {'{'}
                    <br />&nbsp;&nbsp;<span className="text-purple-500">return</span> items.<span className="text-blue-500">reduce</span>((a, b) ={'>'} a + b, 0);
                    <br />{'}'}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Mükemmel Kod!</h4>
                      <p className="text-sm text-gray-500">Performans ve okunabilirlik harika.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-sm text-gray-600 dark:text-gray-400">
                      ✅ Modern ES6 syntax kullanımı
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-sm text-gray-600 dark:text-gray-400">
                      ✅ O(n) zaman karmaşıklığı
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative bg-gray-50/50 dark:bg-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Her Satırda <span className="text-brand-500">Uzman Desteği</span></h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Sadece kodunuzu yapıştırın. Gerisini yapay zeka halletsin.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Code2,
                  color: "brand",
                  title: "Kod Açıklama",
                  desc: "Karmaşık fonksiyonları ve algoritmaları, seviyenize uygun (Başlangıç, Orta, İleri) bir dille açıklar.",
                  features: ["Satır satır analiz", "Türkçe detaylı özet"]
                },
                {
                  icon: ShieldCheck,
                  color: "blue",
                  title: "Güvenlik Tarama",
                  desc: "Kodunuzdaki potansiyel güvenlik açıklarını (XSS, SQL Injection vb.) tespit eder ve çözüm önerir.",
                  features: ["Açık tespiti", "Çözüm önerileri"]
                },
                {
                  icon: Zap,
                  color: "purple",
                  title: "Refactoring",
                  desc: "Kodunuzu daha temiz, okunabilir ve performanslı hale getirmek için modern tekniklerle yeniden yazar.",
                  features: ["Clean Code", "Performans artışı"]
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className={`group p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 hover:border-${feature.color}-500/30 hover:shadow-xl dark:hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}-500/5 dark:bg-${feature.color}-500/10 blur-[60px] rounded-full group-hover:bg-${feature.color}-500/10 dark:group-hover:bg-${feature.color}-500/20 transition-colors`} />

                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center text-${feature.color}-600 dark:text-${feature.color}-500 mb-8 group-hover:scale-110 transition-transform duration-300 border border-${feature.color}-500/20`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {feature.desc}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        <CheckCircle2 size={16} className={`text-${feature.color}-500`} /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white dark:bg-dark-800/30 border-y border-gray-200 dark:border-white/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Nasıl Çalışır?</h2>
              <p className="text-gray-600 dark:text-gray-400">3 basit adımda kodunuzu analiz edin.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

              {[
                { step: "01", title: "Kodu Yapıştır", desc: "Analiz etmek istediğiniz kodu editöre yapıştırın.", icon: Terminal },
                { step: "02", title: "Modu Seç", desc: "Açıklama, Güvenlik veya Refactor modlarından birini seçin.", icon: Cpu },
                { step: "03", title: "Sonucu Gör", desc: "Yapay zeka saniyeler içinde detaylı raporu sunsun.", icon: Sparkles },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-white dark:bg-dark-900 rounded-full border-4 border-gray-100 dark:border-dark-800 flex items-center justify-center mb-6 relative z-10 shadow-lg dark:shadow-none">
                    <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-500">
                      <item.icon size={32} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-xs font-bold border-4 border-white dark:border-dark-900 text-white">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative bg-gray-50/50 dark:bg-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Sıkça Sorulan Sorular</h2>
              <p className="text-gray-600 dark:text-gray-400">Aklınıza takılan soruların cevapları burada.</p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { q: "KodNeYapar? ücretsiz mi?", a: "Evet, temel özellikler tamamen ücretsizdir. İleride premium özellikler eklenebilir." },
                { q: "Hangi dilleri destekliyor?", a: "JavaScript, Python, Java, C#, C++, Go, Rust, PHP ve daha fazlasını destekliyoruz." },
                { q: "Kodlarım kaydediliyor mu?", a: "Sadece geçmiş özelliğini kullanabilmeniz için analiz ettiğiniz kodlar güvenli bir şekilde veritabanımızda saklanır." },
                { q: "Güvenlik analizi ne kadar güvenilir?", a: "Yapay zeka modellerimiz yaygın güvenlik açıklarını tespit etmekte oldukça başarılıdır, ancak %100 garanti vermez." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/[0.07] transition-colors shadow-sm dark:shadow-none"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-900/5 dark:bg-brand-900/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/10 dark:bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Kodlamaya Yeni Bir Bakış</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                Hemen ücretsiz hesabını oluştur ve kodlarını profesyonel bir gözle analiz etmeye başla.
              </p>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-14 px-10 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto text-lg">
                    Ücretsiz Başla <ArrowRight size={20} />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <button className="h-14 px-10 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto text-lg">
                    Analize Devam Et <ArrowRight size={20} />
                  </button>
                </Link>
              </SignedIn>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                <Code2 size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Kod<span className="text-brand-500">NeYapar?</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 KodNeYapar? Tüm hakları saklıdır.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Gizlilik</Link>
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Kullanım Şartları</Link>
              <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">İletişim</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
