# Rencana Proyek: Book Management System

Berikut adalah rencana proyek yang sangat detail dan langkah-demi-langkah untuk membangun aplikasi "Book Management System" menggunakan Next.js 14+ dengan App Router, TypeScript, Tailwind CSS, dan teknologi lainnya yang telah ditentukan. Rencana ini dibagi ke dalam fase-fase logis, dengan fokus pada implementasi fungsionalitas CRUD, pencarian, penyaringan, serta desain UI/UX dengan tema Glassmorphism. Setiap tugas ditandai sebagai checklist (- [ ]) dan mencakup contoh kode atau perintah terminal jika diperlukan.

## Fase 1: Inisialisasi & Setup Proyek
- [ ] Inisialisasi proyek Next.js 14+ dengan TypeScript, Tailwind CSS, dan ESLint.
  - Jalankan perintah: `npx create-next-app@latest book-management-system --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - Pastikan menggunakan App Router (opsi --app).
- [ ] Konfigurasi Tailwind CSS untuk tema Glassmorphism.
  - Edit `tailwind.config.js` untuk menambahkan custom colors dan utilities (misalnya backdrop-blur, transparansi).
  - Contoh: Tambahkan palet warna dingin (biru muda, ungu muda, teal aksen) dan font Google Fonts (Inter).
- [ ] Setup Google Fonts untuk tipografi (Inter atau Poppins).
  - Tambahkan link font di `layout.tsx` atau `globals.css`.
- [ ] Konfigurasi ESLint dan TypeScript untuk standar proyek.
  - Pastikan `tsconfig.json` dan `eslint.config.mjs` sesuai dengan Next.js 14+.
- [ ] Buat struktur folder dasar di `src/`: `app/`, `components/`, `lib/`, `types/`, `actions/`.

## Fase 2: Setup Database & Prisma
- [ ] Setup Vercel Postgres sebagai database.
  - Buat akun Vercel dan inisialisasi database baru.
  - Dapatkan connection string dari Vercel dashboard.
- [ ] Instal dan inisialisasi Prisma sebagai ORM.
  - Jalankan: `npm install prisma @prisma/client`
  - Inisialisasi Prisma: `npx prisma init`
- [ ] Definisikan skema database di `prisma/schema.prisma`.
  - Model Book: id (String, primary key), title (String), author (String), year (Int), coverUrl (String, optional), summary (String, optional), createdAt (DateTime), updatedAt (DateTime).
  - Provider: postgresql, url dari Vercel.
- [ ] Generate dan push skema ke database.
  - Jalankan: `npx prisma generate` dan `npx prisma db push`.
- [ ] Buat file koneksi database di `lib/db.ts`.
  - Contoh: `import { PrismaClient } from '@prisma/client'; const prisma = new PrismaClient(); export default prisma;`

## Fase 3: Setup Validasi & Server Actions
- [ ] Instal Zod untuk validasi.
  - Jalankan: `npm install zod`
- [ ] Buat skema validasi Zod di `lib/validations.ts`.
  - Skema untuk Book: title (string, min 1), author (string, min 1), year (number, min 1000, max current year), coverUrl (string, url optional), summary (string optional).
- [ ] Buat Server Actions untuk CRUD di `actions/bookActions.ts`.
  - Fungsi: createBook, getBooks, updateBook, deleteBook.
  - Gunakan Prisma untuk query dan Zod untuk validasi input.
  - Contoh untuk createBook: Validasi input dengan Zod, lalu prisma.book.create().

## Fase 4: Implementasi UI/UX Dasar (Layout & Tema)
- [ ] Update `globals.css` untuk tema Glassmorphism.
  - Tambahkan CSS custom untuk gradien latar belakang (linear-gradient dari biru muda ke ungu muda), backdrop-filter, dan transparansi.
  - Contoh: `body { background: linear-gradient(135deg, #e0f2fe, #f3e8ff); } .glass { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); }`
- [ ] Buat komponen layout utama di `components/Layout.tsx`.
  - Header dengan search bar dan filter, main content untuk grid buku, footer sederhana.
  - Gunakan Tailwind classes untuk responsivitas dan glassmorphism.
- [ ] Update `app/layout.tsx` untuk mengintegrasikan Layout dan font.
  - Tambahkan metadata: title "Book Management System", description sesuai.
- [ ] Buat komponen dasar: Button, Input, Card di `components/ui/`.
  - Button: Dengan efek glass dan aksen teal.
  - Card: Untuk menampilkan buku dengan efek kaca.

## Fase 5: Implementasi CRUD Buku
- [ ] Buat halaman utama (`app/page.tsx`) untuk menampilkan daftar buku.
  - Fetch data menggunakan Server Actions (getBooks).
  - Tampilkan dalam grid responsif dengan Card komponen.
- [ ] Buat form untuk Create Book di `components/BookForm.tsx`.
  - Fields: title, author, year, coverUrl, summary.
  - Validasi dengan Zod, submit ke createBook action.
  - Modal atau halaman terpisah dengan efek glassmorphism.
- [ ] Implementasi Update: Edit form di BookForm, dengan pre-fill data.
  - Action: updateBook.
- [ ] Implementasi Delete: Tombol delete di Card, dengan konfirmasi modal.
  - Action: deleteBook.
- [ ] Tambahkan loading states dan error handling di semua form dan actions.

## Fase 6: Implementasi Pencarian & Penyaringan
- [ ] Buat komponen SearchBar di `components/SearchBar.tsx`.
  - Input dengan efek glass, debounced search (gunakan useDebounce hook).
  - Update URL params untuk search query.
- [ ] Buat komponen FilterSort di `components/FilterSort.tsx`.
  - Dropdown untuk sort: title asc/desc, year asc/desc.
  - Update URL params untuk filter/sort.
- [ ] Update `app/page.tsx` untuk handle search params.
  - Gunakan useSearchParams untuk filter query dan sort.
  - Pass ke getBooks action dengan filter.
- [ ] Integrasikan search dan filter ke layout header.

## Fase 7: Optimisasi & Testing
- [ ] Optimisasi performa: Implementasi pagination atau infinite scroll jika daftar buku besar.
- [ ] Testing unit untuk Server Actions dan komponen.
  - Gunakan Jest dan React Testing Library.
- [ ] Testing integrasi: Jalankan aplikasi lokal, test CRUD, search, filter.
  - Jalankan: `npm run dev`, lalu test manual di browser.
- [ ] Responsivitas: Pastikan layout bekerja di mobile dan desktop.

## Fase 8: Deployment & Finalisasi
- [ ] Deploy ke Vercel.
  - Connect repo GitHub, deploy otomatis.
  - Setup environment variables untuk database.
- [ ] Final review: Pastikan tema Glassmorphism konsisten, fungsionalitas lengkap.
- [ ] Dokumentasi: Update README.md dengan instruksi setup dan penggunaan.

Rencana ini mencakup semua aspek yang diminta, dengan prioritas pada fungsionalitas CRUD, search/filter, dan desain UI/UX. Setiap fase dapat dijalankan secara berurutan, dan kode contoh disediakan untuk langkah kunci.
