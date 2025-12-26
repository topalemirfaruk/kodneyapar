import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { code, level, lineByLine, mode, language, targetLanguage } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API anahtarı eksik. Lütfen .env.local dosyasını kontrol edin." },
        { status: 500 }
      );
    }

    // Check for non-ASCII characters in API Key (e.g. Turkish chars like 'ı')
    if (/[^\x00-\x7F]/.test(apiKey)) {
      return NextResponse.json(
        { error: "API anahtarınız geçersiz karakterler (örneğin Türkçe karakterler) içeriyor. Lütfen API anahtarını kontrol edin." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    let prompt = "";

    if (mode === "explain") {
      prompt = `
        Sen uzman bir yazılım eğitmenisin. Aşağıdaki ${language || "bilinmeyen"} dilindeki kodu "${level}" seviyesindeki birine açıklaman gerekiyor.
        
        Kod:
        \`\`\`${language || ""}
        ${code}
        \`\`\`

        Lütfen yanıtı SADECE geçerli bir JSON formatında ver. Başka hiçbir metin ekleme.
        JSON formatı şöyle olmalı:
        {
          "summary": "Kodun ne yaptığına dair kısa, net bir özet.",
          "details": "Kodun nasıl çalıştığına dair detaylı açıklama. Markdown formatı kullanabilirsin.",
          "lineByLine": ${lineByLine ? '["1. satır açıklaması", "2. satır açıklaması", ...]' : 'null'},
          "errors": ["Varsa potansiyel hatalar veya uyarılar"],
          "improvements": ["Varsa iyileştirme önerileri"]
        }
      `;
    } else if (mode === "security") {
      prompt = `
        Sen bir siber güvenlik uzmanısın. Aşağıdaki ${language || "bilinmeyen"} dilindeki kodu güvenlik açıklarına karşı analiz et.

        Kod:
        \`\`\`${language || ""}
        ${code}
        \`\`\`

        Lütfen yanıtı SADECE geçerli bir JSON formatında ver. Başka hiçbir metin ekleme.
        JSON formatı şöyle olmalı:
        {
          "securityReport": {
            "level": "low" | "medium" | "high" | "critical",
            "issues": ["Bulunan güvenlik açığı 1", "Bulunan güvenlik açığı 2"]
          }
        }
        Eğer hiç açık yoksa issues boş dizi olsun ve level "low" olsun.
      `;
    } else if (mode === "refactor") {
      prompt = `
        Sen kıdemli bir yazılım mühendisisin. Aşağıdaki ${language || "bilinmeyen"} dilindeki kodu Clean Code prensiplerine göre refactor et.
        Daha okunabilir, performanslı ve modern teknikler kullan.

        Kod:
        \`\`\`${language || ""}
        ${code}
        \`\`\`

        Lütfen yanıtı SADECE geçerli bir JSON formatında ver. Başka hiçbir metin ekleme.
        JSON formatı şöyle olmalı:
        {
          "refactoredCode": "Refactor edilmiş kodun tamamı (string olarak)"
        }
      `;
    } else if (mode === "converter") {
      prompt = `
        Sen uzman bir çok dilli yazılım geliştiricisisin. Aşağıdaki ${language || "bilinmeyen"} dilindeki kodu **${targetLanguage}** diline çevir.
        
        Kurallar:
        1. Kodun mantığını ve işlevselliğini birebir koru.
        2. Hedef dilin (${targetLanguage}) best practice'lerine (en iyi uygulamalarına) ve isimlendirme standartlarına uy.
        3. Gerekli kütüphane importlarını ekle.
        4. Eğer kod o dilde çalıştırılamazsa (örn: tarayıcı API'leri backend dilinde), eşdeğer alternatifler kullan veya yorum satırı ile belirt.

        Kod:
        \`\`\`${language || ""}
        ${code}
        \`\`\`

        Lütfen yanıtı SADECE geçerli bir JSON formatında ver. Başka hiçbir metin ekleme.
        JSON formatı şöyle olmalı:
        {
          "convertedCode": "Dönüştürülmüş kodun tamamı (string olarak)"
        }
      `;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present in the response
    const cleanJson = text.replace(/```json\n|\n```/g, "").replace(/```/g, "").trim();

    try {
      const data = JSON.parse(cleanJson);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.log("Raw Text:", text);
      return NextResponse.json(
        { error: "Yapay zeka yanıtı işlenemedi." },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: `Bir hata oluştu: ${error.message || error.toString()}` },
      { status: 500 }
    );
  }
}
