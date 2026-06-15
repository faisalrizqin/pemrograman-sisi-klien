# Panduan Screenshot Kode & Tampilan (User Role & Permission)

Dokumen ini menjelaskan bagian-bagian kode dan alur tampilan aplikasi yang harus di-screenshot untuk melengkapi laporan tugas dalam bentuk PDF.

---

## 📸 Bagian 1: Screenshot Source Code (Kode Sumber)

Untuk menunjukkan implementasi fitur pengubahan Role dan Permission, ambil screenshot pada file-file berikut:

### 1. `src/Pages/Admin/User/User.jsx`
File ini adalah controller utama yang mengatur state form, perubahan role, toggle permission, serta submit data ke API.
*   **Screenshot A (Handler State & Fungsi Perubahan):**
    *   **Baris:** `42` s.d `76`
    *   **Fokus Kode:** Fungsi `openEditModal`, `handleRoleChange` (mengubah role dan otomatis menerapkan permission default), `handlePermissionToggle` (menambah/menghapus permission secara dinamis), dan `handleApplyDefaultPermissions` (reset ke default).
*   **Screenshot B (Fungsi Submit / Save ke API):**
    *   **Baris:** `78` s.d `108`
    *   **Fokus Kode:** Fungsi `handleSubmit` yang mengirim data baru ke API (`updateUser`), memicu SweetAlert, dan memperbarui AuthContext jika user yang diubah adalah user yang sedang login.

### 2. `src/Pages/Admin/User/UserModal.jsx`
File ini mengatur tampilan modal/dialog edit role & permission serta kustomisasi checkbox.
*   **Screenshot C (Pilihan Role & Checkbox Permission):**
    *   **Baris:** `49` s.d `111`
    *   **Fokus Kode:** Dropdown `<select>` untuk mengubah role, tombol "Reset ke Default Role", dan looping checkbox `PERMISSION_GROUPS` untuk memilih permission secara detail.

### 3. `src/Pages/Admin/User/UserTable.jsx`
File ini menampilkan daftar user dalam bentuk tabel beserta kolom aksi edit.
*   **Screenshot D (Tombol Edit & Kolom Aksi):**
    *   **Baris:** `34` s.d `63`
    *   **Fokus Kode:** Tampilan badge permission di kolom tabel, serta pengecekan permission `user.update` untuk menampilkan tombol "Edit Role & Permission".

### 4. `src/Data/RolePermission.js`
File konfigurasi role dan permission default.
*   **Screenshot E (Konfigurasi Role & Permission):**
    *   **Baris:** `1` s.d `20` dan `63` s.d `93`
    *   **Fokus Kode:** Array `ROLES`, `PERMISSION_GROUPS`, dan objek `DEFAULT_PERMISSIONS_BY_ROLE`.

### 5. `src/Utils/Apis/UserApi.js`
File yang mendefinisikan request ke backend.
*   **Screenshot F (Endpoint Update User):**
    *   **Baris:** `7`
    *   **Fokus Kode:** `export const updateUser = (id, data) => axios.put('/user/' + id, data);`

---

## 🖥️ Bagian 2: Screenshot Tampilan Antarmuka (UI)

Pastikan backend (`npm run serve`) dan frontend (`npm run dev`) Anda sedang berjalan. Berikut adalah alur tampilan yang harus diambil gambarnya secara berurutan:

### Langkah 1: Halaman Manajemen User (Tabel Utama)
1.  Login menggunakan akun Admin:
    *   **Email:** `admin@mail.com`
    *   **Password:** `admin123`
2.  Buka menu **User** di Sidebar sebelah kiri.
3.  **Screenshot 1:** Tampilan halaman manajemen user yang menampilkan tabel berisi daftar user (Admin 1, Mahasiswa 1), kolom Role, daftar Permission (dalam bentuk badge abu-abu), dan tombol **Edit Role & Permission** di kolom Aksi.

### Langkah 2: Membuka Modal Edit Role & Permission
1.  Pada baris **Mahasiswa 1**, klik tombol **Edit Role & Permission**.
2.  **Screenshot 2:** Tampilan modal/dialog popup yang muncul. Pastikan terlihat informasi Nama & Email yang ter-disabled, dropdown Role (bernilai "Mahasiswa"), serta daftar checkbox permission (di mana hanya permission KRS yang tercentang).

### Langkah 3: Mengubah Role & Otomatisasi Permission Default
1.  Ubah dropdown **Role** dari "Mahasiswa" menjadi **Dosen** atau **Admin**.
2.  Perhatikan bahwa checkbox di bagian bawah akan langsung tercentang secara otomatis sesuai dengan permission default dari role baru tersebut.
3.  **Screenshot 3:** Tampilan modal setelah dropdown role diubah, memperlihatkan checkbox yang berubah otomatis.

### Langkah 4: Kustomisasi Checkbox Permission secara Manual
1.  Coba tambah atau kurangi centang pada checkbox secara manual (misalnya: centang *Tambah Mahasiswa* atau hapus centang *Lihat Mahasiswa*).
2.  **Screenshot 4:** Tampilan modal yang menunjukkan kombinasi checkbox kustom (beberapa checkbox terpilih secara manual di luar default role).

### Langkah 5: Proses Menyimpan & Hasil Pembaruan
1.  Klik tombol **Simpan Perubahan** di dalam modal.
2.  Akan muncul dialog konfirmasi SweetAlert. Klik **Ya/OK**.
3.  Akan muncul Toast Notification hijau di pojok kanan atas bertuliskan *"Role dan permission berhasil diperbarui"*.
4.  **Screenshot 5:** Tampilan ketika Toast Notification berhasil muncul di layar, dan modal edit telah tertutup.
5.  **Screenshot 6:** Tampilan tabel utama setelah data terupdate, memperlihatkan Role atau badge Permission milik **Mahasiswa 1** yang telah berubah sesuai dengan konfigurasi baru yang Anda simpan.
