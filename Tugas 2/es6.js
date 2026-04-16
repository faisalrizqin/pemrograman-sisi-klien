// ================== DATA AWAL ==================
const mataKuliahList = {
	mataKuliah: [
		{ kode: "MK001", nama: "Algoritma", sks: 3 },
		{ kode: "MK002", nama: "Basis Data", sks: 3 },
		{ kode: "MK003", nama: "Pemrograman Web", sks: 4 }
	]
};

const mahasiswaList = {
	mahasiswa: [
		{
			nim: "22001",
			nama: "Budi",
			status: true,
			matkul: [
				{ matkulId: "MK001", tugas: 80, uts: 75, uas: 85 },
				{ matkulId: "MK002", tugas: 85, uts: 80, uas: 90 }
			]
		},
		{
			nim: "22002",
			nama: "Siti",
			status: true,
			matkul: [
				{ matkulId: "MK002", tugas: 70, uts: 65, uas: 75 }
			]
		}
	]
};

// ================== FUNCTION ==================

// show
const show = () => {
	mahasiswaList.mahasiswa.forEach((mhs) => {
		console.log(`NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`);
		console.log("Mata Kuliah:");

		mhs.matkul.forEach((mk) => {
			const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
			const matkulName = matkul ? matkul.nama : "Tidak ditemukan";

			console.log(`- ${matkulName}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`);
		});
		console.log("---------------");
	});
};

// add
const add = (mahasiswa) => mahasiswaList.mahasiswa.push(mahasiswa);

// update
const update = (nim, dataBaru) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) =>
		m.nim === nim ? { ...m, ...dataBaru } : m
	);
};

// delete
const deleteById = (nim) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((m) => m.nim !== nim);
};

// total nilai
const totalNilai = (nim) => {
	const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
	if (!mahasiswa) return "Mahasiswa tidak ditemukan";

	return mahasiswa.matkul.map((mk) => {
		const total = mk.tugas + mk.uts + mk.uas;
		return { matkulId: mk.matkulId, total };
	});
};

// kategori nilai
const kategoriNilai = (nilai) => {
	if (nilai >= 85) return "A";
	if (nilai >= 75) return "B";
	if (nilai >= 65) return "C";
	if (nilai >= 50) return "D";
	return "E";
};

// IPS
const IPS = (nim) => {
	const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
	if (!mahasiswa) return "Mahasiswa tidak ditemukan";

	const totalSks = mahasiswa.matkul.reduce((sum, mk) => {
		const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
		return sum + (matkul ? matkul.sks : 0);
	}, 0);

	const totalNilai = mahasiswa.matkul.reduce((sum, mk) => {
		const nilai = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
		const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
		return sum + nilai * (matkul ? matkul.sks : 0);
	}, 0);

	return (totalNilai / totalSks).toFixed(2);
};

// clear (ganti array baru)
const clear = () => {
	mahasiswaList.mahasiswa = [];
};

// ================== ARRAY FUNCTION ==================

// jumlah mahasiswa
const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

// sort by NIM
const sortByNIM = () => mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));

// sort by status
const sortByStatus = () => {
	return mahasiswaList.mahasiswa.sort((a, b) => b.status - a.status);
};

// jumlah aktif & tidak
const jumlahAktifTidak = () => {
	return {
		aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
		tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length,
	};
};

// clear array (kosongkan array yang sama)
const clearArray = () => {
	mahasiswaList.mahasiswa.length = 0;
};

// ================== TEST ==================

console.log("=== DATA AWAL ===");
show();

// add
add({
	nim: "22003",
	nama: "Andi Setiawan",
	status: true,
	matkul: [{ matkulId: "MK003", tugas: 88, uts: 85, uas: 90 }]
});

console.log("\n=== SETELAH ADD ===");
show();

// update
update("22001", { status: false });

console.log("\n=== SETELAH UPDATE ===");
show();

// delete
deleteById("22002");

console.log("\n=== SETELAH DELETE ===");
show();

// total nilai
console.log("\nTotal Nilai 22001:", totalNilai("22001"));

// kategori
console.log("Kategori 88:", kategoriNilai(88));
console.log("Kategori 72:", kategoriNilai(72));

// IPS
console.log("IPS 22001:", IPS("22001"));

// jumlah mahasiswa
console.log("Jumlah Mahasiswa:", jumlahMahasiswa());

// sort NIM
sortByNIM();
console.log("\n=== SORT BY NIM ===");
show();

// sort status
sortByStatus();
console.log("\n=== SORT BY STATUS ===");
show();

// jumlah aktif tidak
console.log("Jumlah Aktif/Tidak:", jumlahAktifTidak());

// ================== TEST CLEAR ==================

// simpan referensi
let backup = mahasiswaList.mahasiswa;

// clear (ganti array baru)
clear();
console.log("\n=== SETELAH CLEAR (ARRAY BARU) ===");
console.log("mahasiswaList:", mahasiswaList.mahasiswa);
console.log("backup (tidak ikut berubah):", backup);

// isi lagi data
add({
	nim: "22004",
	nama: "Rina",
	status: true,
	matkul: [{ matkulId: "MK001", tugas: 90, uts: 90, uas: 90 }]
});

console.log("\n=== SETELAH ISI LAGI ===");
show();

// clearArray (kosongkan array lama)
let ref = mahasiswaList.mahasiswa;
clearArray();

console.log("\n=== SETELAH CLEAR ARRAY (IN PLACE) ===");
console.log("mahasiswaList:", mahasiswaList.mahasiswa);
console.log("ref (ikut kosong):", ref);