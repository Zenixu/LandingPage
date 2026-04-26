# Rangkuman Pengembangan Spesial "Porsche 356A Scrollytelling Experience"

Dokumen ini adalah ringkasan keseluruhan alur pembangunan *landing page scrollytelling* premium yang kita racik bersama, mulai dari inisiasi baris pertama hingga wujud sempurnanya.

---

## Tahap 1: Inisialisasi & Persiapan Berkas

1. **Memulai Proyek (Next.js & Framer Motion)**
   Kita memulai dengan memerintahkan sistem untuk men-_generate_ Next.js 14 App Router `create-next-app`. Kita memutuskan untuk menolak *TailwindCSS* secara eksplisit agar kita memiliki kendali tingkat piksel murni dengan CSS Vanila (sebagai syarat desain *Old Money/Vintage*).
   *Framer Motion* diinstal ke dalam sistem sebagai mesin utilitas gaya gravitasi *scrollytelling*.
2. **Koleksi Aset**
   Aset *rendering* resolusi tinggi 3D berjumlah 168 gambar berurutan (*image sequence*) yang Anda berikan kita pindahkan langsung ke keranjang utama sistem Next.js: `public/frames/`.
3. **Membangun Dasar "Abyss" & Tipografi (`globals.css`)**
   Seluruh *boilerplate* dihapus. Kita mendirikan fondasi warna dengan hitam pekat absolut (`#050505`). Google Fonts `Cinzel` (sebagai alternatif *Didot/Publico* fungsional) dan `Inter` (sans-serif) ditambahkan via impor global untuk menunjang tampilan kelas atas. Disini juga kita mematikan kemunculan *native scrollbar* di browser agar estetik tidak terpotong.

---

## Tahap 2: Inti Mesin Penggerak (`ClassicPorscheCanvas.tsx`)

Ini adalah "komponen mesin" kita. Di sinilah semua ilmu fisika dan kanvas terhubung.

- **`useEffect` (Preload Images)**: Di awal, file ini akan memilah ke-168 frame foto, membuat _element Image_ maya, dan memaksa _browser_ meng-unduh (/mengingat) semua framenya. Ini yang membuat *loading bar Ignition* berfungsi! Apabila belum 168 gambar termuat, blok loading akan menutup layar.
- **`useScroll` & `useSpring`**: Fungsinya "mendengarkan" seberapa jauh roda *mouse*/trackpad Anda turun. `useSpring` menumpulkan pergerakan responsif tersebut lalu menambahkan beban inersia buatan, memberikan efek "memutar kenop pintu besi lambat" yang kokoh khas mobil vintage.
- **`useTransform`**: Menerjemahkan angka gulir 0-1 (progress halaman) secara eksak ke indeks foto (0-167).
- **`renderFrame` & `useMotionValueEvent`**: Fungsi vital. Setiap kali indeks frame berganti, fungsinya akan membersihkan `ctx.clearRect` dan menumpahkan/melukis frame image ke atas kanvas grafis pada layar Anda secara ekstrim presisi tanpa pernah tersendat.

---

## Tahap 3: Konstruksi "Beats" Penutur Dongeng (`page.tsx`)

Di file pusat ini, kita membangun jembatan agar Kanvas di tahap dua bisa berbicara dengan gulir browser standar Anda.

- **`sequenceRef` (The Targeting)**: Memblok ketinggian `475vh` (sebagai arena bermain). `useScroll` pada file ini diperintahkan untuk hanya bereaksi saat Anda berada di dalam arena `475vh` ini. Jika Anda keluar, dia berhenti peduli.
- **The "Sticky" Canvas Envelope**: Trik mahakarya kita. Kanvas mobil ditangkap di dalam bungkus berposisi *sticky / menempel*. Akibatnya, saat Anda menggulir ke bawah, alih-alih ikut meluncur ke bawah halaman, mobil tersebut tertahan di tengah monitor persis selama `475vh` ke depan, berpura-pura menjadi layaknya video padahal hanyalah sekumpulan _frame canvas_.
- **`whileInView` pada Teks (`Beat A-D`)**: Masing-masing seksi teks (seperti "Typ 540" atau "HAND-FORMED") diberikan ketinggian `100vh`. Karena tingginya, Anda berasa dipandu turun bagai per level. Framer Motion `<motion.div whileInView />` lalu perlahan menggeser (*fade-in slide*) kemunculan kalimat indah dari bayangan.
- **Jeda Transisi 75vh**: Pemisah senyap tanpa teks di mana pengembang menyelipkan spasi semata. Tujuannya membiarkan mobil yang direstorasi sepenuhnya bersinar sendiri di kegelapan layar tanpa gangguan.

---

## Tahap 4: Akhir Perjalanan, Menu Informasi (`page.tsx`)

Setelah keluar jauh dari batas dinding tempel *sticky* `475vh`, mobil akhirnya terlepas. Gaya tarik alami _browser web_ kembali mengambil kendali, mengangkat perlahan mobil tersebut ke atas meninggalkan layar monitor Anda.

- Di titik ini, karena kita memprogram **Information & Specification Section** berada tepat di bawah arena `sequenceRef`, blok informasi hitam-pekat ini akan ikut menyapu dari alas monitor tanpa cela. 
- Di sinilah kita memainkan Layout Majalah (*Editorial Typography Constraints*) menggunakan *flexbox / minimal border*, mempresentasikan harga sejarah Porsche, detail warisan asalnya, dan tombokan tombol mewah menuju situs web orisinil Porsche, mengakhiri perputaran skenario *scrollytelling* interaktif web Anda.
