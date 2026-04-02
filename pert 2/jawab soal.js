/* // latihan soal
1. buat 1 object mahasiswa terdiri:
- nama
- nim

2. buat array object listMatkul, tiap object terdiri dari:
- matkulId
- nilai
- matkulNama

3. spread array listMatkul ke dalam obj mahasiswa

4. tampilkan dengan literal, output biodata mahasiswa dan matkul yang diambil */

const mahasiswa = {
    // key: value
    nim: "123213",
    nama: "Budi Santoso"    
};

// array of objects
const listMatkul = [
    { matkulId: "123", nilai: 90, matkulNama: "Daspro"},
    { matkulId: "124", nilai: 92, matkulNama: "Alpro"},
    { matkulId: "125", nilai: 95, matkulNama: "PBW"}
];

const new_mahasiswa = {
    ...mahasiswa,
    listMatkul
};

console.log(new_mahasiswa);