# KodNeYapar? - Yapay Zeka Destekli Kod Analiz Asistanı

**KodNeYapar?**, geliştiricilerin kodlarını daha iyi anlamalarına, güvenlik açıklarını tespit etmelerine ve kod kalitesini artırmalarına yardımcı olan yapay zeka destekli bir web uygulamasıdır.

![Project Banner](public/og-image.png)

## 🚀 Özellikler

KodNeYapar? üç temel modda çalışır:

1.  **🧐 Kod Açıklama (Code Explanation)**
    *   Karmaşık fonksiyonları ve algoritmaları satır satır analiz eder.
    *   Başlangıç, Orta ve İleri seviye seçenekleriyle kullanıcının bilgi düzeyine uygun açıklamalar sunar.
    *   Kodun ne yaptığını Türkçe olarak detaylıca özetler.

2.  **🛡️ Güvenlik Tarama (Security Scanning)**
    *   Kodunuzdaki potansiyel güvenlik açıklarını (XSS, SQL Injection, vb.) tespit eder.
    *   Tespit edilen açıklar için çözüm önerileri ve güvenli kod örnekleri sunar.

3.  **⚡ Refactoring (Kod İyileştirme)**
    *   Kodunuzu daha temiz, okunabilir ve performanslı hale getirir.
    *   Modern kodlama standartlarına (Clean Code) uygun yeniden yazım önerileri sunar.
    *   Zaman ve bellek karmaşıklığını optimize eder.

## 🛠️ Teknolojiler

Bu proje, modern web teknolojileri kullanılarak geliştirilmiştir:

*   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Animasyonlar)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **AI Model**: [Google Gemini API](https://ai.google.dev/) (@google/generative-ai)
*   **Database**: [Prisma](https://www.prisma.io/) (SQLite/PostgreSQL)
*   **Payments**: [Stripe](https://stripe.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın**
    ```bash
    git clone https://github.com/topalemirfaruk/kodneyapar.git
    cd kodneyapar
    ```

2.  **Bağımlılıkları Yükleyin**
    ```bash
    npm install
    ```

3.  **Çevresel Değişkenleri Ayarlayın**
    `.env.local` dosyasını oluşturun ve gerekli API anahtarlarını ekleyin:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    GEMINI_API_KEY=AIzaSy...
    
    DATABASE_URL="postgresql://..." # Vercel Postgres veya başka bir Postgres URL'i

    STRIPE_SECRET_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
    ```

4.  **Veritabanını Hazırlayın**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Uygulamayı Çalıştırın**
    ```bash
    npm run dev
    ```
    Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir "issue" açarak veya "pull request" göndererek projeye destek olun.

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakabilirsiniz.
