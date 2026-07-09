# Monster Notebook Redesign

Monster Notebook deneyiminden esinlenen modern bir frontend case study. Proje; ürün keşfi, karşılaştırma, sepet, Google ile giriş ve PWA desteğini tek sayfalık, hızlı ve modüler bir Next.js arayüzünde toplar.

Bu çalışma resmi Monster Notebook projesi değildir. Portfolyo ve işe alım değerlendirmesi için hazırlanmış bir yeniden tasarım/prototip çalışmasıdır.

## Öne Çıkanlar

- Feature based klasör yapısı
- Next.js App Router, React 19 ve TypeScript
- Tailwind CSS ile responsive arayüz
- Redux Toolkit ile auth, sepet ve karşılaştırma state yönetimi
- Firebase Authentication ile Google girişi
- Ürün arama, filtreleme ve karşılaştırma akışları
- Mobilde sürüklenebilir sepet balonu
- Local storage destekli sepet kalıcılığı
- PWA manifest ve service worker altyapısı

## Teknoloji Yığını

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Firebase
- Framer Motion
- Radix UI Dialog
- Lucide React

## Kurulum

```bash
npm install
```

Firebase ile Google girişini kullanmak için `.env.example` dosyasını temel alarak `.env.local` oluşturun:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Komutlar

```bash
npm run dev
npm run build
npm run start
npm run type-check
```

Not: `npm run lint` script'i mevcut olsa da Next.js 15 ve ESLint 9 kombinasyonunda proje ayarına göre ek ESLint yapılandırması gerekebilir.

## Proje Yapısı

```text
src/
  app/                 Uygulama kabuğu, provider'lar ve store
  features/
    auth/              Firebase Google giriş akışı
    cart/              Sepet drawer'ı, mobil sepet balonu ve cart state'i
    navigation/        Header, footer ve navigasyon verileri
    products/          Ürün listesi, arama, kartlar ve karşılaştırma
    showcase/          Hero ve vitrin bölümleri
  shared/              Ortak enum, interface ve yardımcı fonksiyonlar
public/
  images/products/     Ürün görselleri
  manifest.webmanifest PWA manifest dosyası
  sw.js                Service worker
```

## Mimari Notlar

Uygulama feature based bir düzen izler. Her alan kendi component, data, interface, service ve store parçalarını mümkün olduğunca kendi klasöründe tutar. Bu yapı ürün, sepet, auth ve navigasyon gibi bağımsız iş alanlarının daha rahat geliştirilmesini sağlar.

Sepet state'i Redux Toolkit ile yönetilir ve local storage'a yazılır. Ürün karşılaştırma akışı yine Redux state'i üzerinden çalışır. Firebase istemci tarafında yapılandırılır; eksik ortam değişkenlerinde kullanıcıya anlaşılır hata mesajı gösterilir.

## Lisans ve Marka Notu

Bu repo eğitim/portfolyo amaçlıdır. Monster adı ve ürün ailesi referansları marka esinli demo bağlamında kullanılmıştır; ticari veya resmi bir temsil amacı taşımaz.
