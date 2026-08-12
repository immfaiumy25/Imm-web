# WYSIWYG Profile Editor Implementation

Membangun editor visual langsung (WYSIWYG) untuk halaman Profil Admin, dengan tata letak (layout) yang persis menyerupai tampilan depan (Landing Page), sehingga admin bisa langsung mengedit teks dan gambar di tempat.

## User Review Required

> [!IMPORTANT]
> **Metode Upload Gambar**: Karena aplikasi menggunakan Next.js (yang biasanya di-*deploy* ke *serverless* seperti Vercel), menyimpan file gambar secara lokal sering hilang saat server *restart*. 
> **Pertanyaan**: Apakah Anda ingin *input* gambar berupa **Tautan/URL Gambar** saja, atau Anda ingin fitur **Upload Gambar** yang akan diubah menjadi *Base64* dan disimpan ke *database*? (Base64 aman untuk gambar kecil-menengah, tapi bisa memberatkan *database* jika file sangat besar). Saya merekomendasikan **Input URL** atau **Base64** untuk kemudahan.

## Open Questions

- Untuk bagian **Misi**, apakah cukup menggunakan satu *textarea* besar di mana setiap baris baru (*Enter*) dianggap sebagai satu poin (bullet point) baru?

## Proposed Changes

### Database & Actions
Kita akan menggunakan `SiteSetting` dengan *key* khusus `profile_page_data` yang berisi JSON string dari seluruh konten Profil. Ini lebih bersih daripada membuat puluhan *key* terpisah.

#### [NEW] `src/app/actions/profileSettings.ts`
- Server action `updateProfileSettings(data: string)` untuk menyimpan JSON ke *database*.
- Fungsi `getProfileSettings()` untuk memanggil dan memberikan *default value* (nilai bawaan saat ini) jika belum ada data.

### Frontend (Landing Page)

#### [MODIFY] `src/app/page.tsx`
- Menambahkan *fetch* data dari `getProfileSettings()` menggunakan `useEffect` dan menyimpan dalam *state* (mirip seperti yang dilakukan di Hero Home).
- Mengganti teks statis dan gambar (Menciptakan Kader, Pengurus, Visi Misi) menjadi variabel dinamis dari *state* tersebut.

### Admin Panel

#### [MODIFY] `src/app/admin/profil/page.tsx`
- Membuat halaman yang memuat tata letak (layout) asli dari `src/app/page.tsx`.
- Mengganti *tag* statis seperti `<h1>`, `<p>`, dan `<img>` menjadi elemen *input* (`<input>`, `<textarea>`) transparan yang bisa langsung diketik oleh Admin.
- Tampilan form akan menggunakan gaya "Liquid Glass" yang membaur dengan latar belakang *gradient* asli.
- Saat tombol "Simpan" ditekan, semua data dari *layout* visual tersebut dikirim sebagai JSON ke *database*.

## Verification Plan

### Automated Tests
- Menjalankan `npm run build` untuk memastikan tidak ada *error* tipe data.

### Manual Verification
- Masuk ke `/admin/profil`.
- Mengubah teks Visi, nama pengurus, dan gambar.
- Menyimpan dan memverifikasi perubahan langsung tercermin di halaman depan `/`.
