# Game of Thrones — Westeros Günlükleri

<p align="center">
  <a href="README.md"><b>English</b></a> | <a href="README.tr.md"><b>Türkçe</b></a>
</p>

Westeros'un kadim efsanelerini, Büyük Hanedanlıklarını, Valyria çeliği cephaneliğini ve efsanevi çağlarını keşfeden, kaydırma odaklı, sürükleyici ve etkileşimli bir web deneyimi.

---

## Özellikler

- **60 FPS Canvas Kaydırma Deneyimi:** Masaüstü ve mobil cihazlarda akıcı ve yüksek kaliteli performans için HTML5 Canvas ve GSAP ScrollTrigger tarafından desteklenen kare kare sinematik sekans.
- **6 Bölümlü Anlatı İlerlemesi:** Başlangıç (Prologue), Kışyarı (Winterfell), Yedi Krallık, Kralın Şehri (King's Landing), Bin Kılıç ve Demir Taht.
- **Westeros'un Büyük Hanedanlıkları:** Üzerine gelindiğinde sözleri ve efsaneleri açığa çıkaran; Stark, Lannister, Targaryen, Baratheon, Greyjoy ve Tyrell hanedanlıklarına ait etkileşimli 3D eğimli hanedan kartları.
- **Valyria Çeliği Cephaneliği:** Efsanevi silahlar (Uzunpençe/Longclaw, Buz/Ice, Karaateş/Blackfyre, Karanlık Kızkardeş/Dark Sister, Kedigözü Hançer, Yürekfelaketi/Heartsbane) için istatistikler, kökenler, tarihi taşıyıcılar ve büyüyle dövülmüş efsaneleri içeren etkileşimli kılıç inceleme ekranı.
- **Diyar Günlükleri:** Şafak Çağı ve Uzun Gece'den Valyria'nın Kıyameti'ne, Aegon'un Fethi'ne, Ejderhaların Dansı'na ve Robert'ın İsyanı'na kadar 12.000 yıllık tarihi kapsayan etkileşimli zaman çizelgesi.
- **Karanlık Gotik Estetik:** Cinzel, Cinzel Decorative ve IM Fell English yazı tipleriyle elle hazırlanmış tipografi; altın varak geçişleri, ortam vinyetleri ve hafif film gren dokuları ile zenginleştirilmiştir.

---

## Teknoloji Yığını

- **Çatı (Framework):** React 19
- **Derleme Aracı:** Vite
- **Animasyon ve Kaydırma:** GSAP ve ScrollTrigger
- **İşleme Motoru (Rendering):** HTML5 Canvas (2D Görüntü Dizisi Tamponu)
- **Stillendirme:** Özel tasarım tokenlarına sahip modüler CSS

---

## Performans Mimarisi

Standart HTML5 video öğeleri, uzun ana kare aralıkları (GOP) nedeniyle hızlıca kaydırıldığında kod çözücü gecikmesi yaşar ve kare atlar.

Bu proje, optimize edilmiş bir WebP kare dizisini bellek tamponuna önceden yükleyerek ve kareleri doğrudan `CanvasRenderingContext2D.drawImage()` aracılığıyla işleyerek bu darboğazı çözer. Bu sayede kullanıcının kaydırma hızından bağımsız olarak milisaniyenin altında çizim süreleri ve garantili 60+ FPS kaydırma hızı elde edilir.

---

## Başlarken

### Gereksinimler

- Node.js 18+ kurulu olmalıdır
- npm / yarn / pnpm

### Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/berkaysahin-dev/vision-web-got.git
   cd vision-web-got
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcınızda `http://localhost:5173` adresini açın.

### Üretim Derlemesi
```bash
npm run build
npm run preview
```

---

## Proje Yapısı
```
vision-web-got/
├── public/
│   ├── frames/         # Ayıklanmış 60FPS WebP kare sekansı
│   ├── images/         # Hanedan mühürleri ve grafikler
│   └── video/          # Orijinal referans medya
├── src/
│   ├── components/
│   │   ├── Hero.jsx        # Canvas kaydırma sekansı ve bölüm HUD'ı
│   │   ├── Hero.css
│   │   ├── Section1.jsx    # Büyük Hanedanlık kartları
│   │   ├── Section1.css
│   │   ├── Armory.jsx      # Valyria çeliği silah vitrini
│   │   ├── Armory.css
│   │   ├── Chronicles.jsx  # 12.000 yıllık tarihi zaman çizelgesi
│   │   ├── Chronicles.css
│   │   ├── Footer.jsx      # Sinematik alt bilgi ve navigasyon
│   │   └── Footer.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Emeği Geçenler

- **Shaz Vision** ([shazvision.com](https://shazvision.com)) tarafından tutkuyla tasarlandı ve geliştirildi.
- George R.R. Martin ve HBO tarafından yaratılan *Buz ve Ateşin Şarkısı* evreninden ilham alınmıştır.