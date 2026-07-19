# ZenHub — Portfolio Web App

Portfolio full-stack: konten (proyek, galeri, skill) dikelola dari admin panel, tersimpan di MySQL, gambar di-upload ke Cloudinary. Pesan dari form kontak masuk ke inbox admin.

## Stack

- Next.js 14 (App Router)
- Prisma + MySQL
- Cloudinary (upload gambar)
- JWT (jose) + bcryptjs untuk auth admin
- Tailwind CSS + Framer Motion

## Setup Awal

```bash
npm install
cp .env.example .env
```

Isi `.env`:
- `DATABASE_URL` — dari database MySQL yang dibuat lewat aaPanel
- `JWT_SECRET` — string acak panjang (bisa generate: `openssl rand -hex 32`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — dari dashboard Cloudinary

Sync schema ke database + isi data awal:

```bash
npm run db:push
npm run db:seed
```

Build & jalankan:

```bash
npm run build
npm start
```

## Login Admin Default

```
Email    : admin@zenhub.id
Password : admin123
```

**Wajib ganti password** setelah login pertama (lewat query database langsung, karena belum ada fitur ganti password di UI — bisa ditambahkan kalau perlu).

## Deploy di VPS (aaPanel + PM2)

1. Buat MySQL database baru lewat aaPanel, catat kredensialnya buat `DATABASE_URL`.
2. Upload/clone project ke `/www/wwwroot/nama-domain`.
3. Jalankan setup di atas (`npm install`, `db:push`, `db:seed`, `npm run build`).
4. Jalankan dengan PM2:
   ```bash
   pm2 start npm --name "zenhub" -- start
   pm2 save
   pm2 startup
   ```
5. Di aaPanel, buat **Website** baru → arahkan **Reverse Proxy** ke `http://127.0.0.1:3000` (port default Next.js).
6. Pasang SSL lewat aaPanel (Let's Encrypt) — pastikan pakai `fullchain`, bukan cert doang, biar validasi SSL dari luar (misal webhook/API pihak ketiga) gak gagal.

## Struktur Data

| Model | Fungsi |
|---|---|
| `Profile` | Nama, tagline, bio, kontak — tampil di hero & footer |
| `Project` | Proyek yang tampil di section "Proyek Pilihan" |
| `GalleryItem` | Gambar desain/hasil kerja di section "Galeri Desain" |
| `Skill` | Keahlian, dikelompokkan per kategori (hardware/design/webdev) |
| `Message` | Pesan masuk dari form kontak publik |
| `Admin` | Akun buat login ke `/admin` |

## Halaman Admin (`/admin`)

- **Dashboard** — ringkasan jumlah proyek, galeri, skill, pesan
- **Proyek** — CRUD + upload thumbnail
- **Galeri** — CRUD gambar desain
- **Skill** — CRUD per kategori
- **Pesan** — inbox dari form kontak, tandai dibaca/hapus
- **Profil** — edit data yang tampil di halaman publik

## Catatan

- Semua route `/admin/*` dan `/api/admin/*` diproteksi middleware — otomatis redirect ke login kalau belum authenticated.
- Upload gambar dibatasi 5MB, harus format image.
- Form kontak publik dibatasi rate limit sederhana (5 request/menit per IP) buat cegah spam — kalau traffic tinggi, pertimbangkan ganti ke rate limiter berbasis Redis.
