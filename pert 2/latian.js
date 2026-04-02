// variabel, menampung 1 data
const nim = "123213";

// variabel array, menampung multiple data tapi hanya 1 tipe data
const list_nim = ["123213", "14954", "14969"];

// object, menampung multiple data dan multiple tipe data
const mahasiswa = {
    // key: value
    nim: "123213",
    nama: "Budi Santoso",
    umur: 21,
    status: true,
        matkul: [
            {
                matkulId: "MK001",
                nilai: 89
            },
            {
                matkulId: "MK002",
                nilai: 70
            }
        ]
};

console.log(mahasiswa)

// array of object
const list_mahasiswa = [
    {
        nama: "mahasiswa 1",
        nim: "A11.22222",
        umur: 17
    },
    {
        nama: "mahasiswa 2",
        nim: "A11.11111",
        umur: 19
    }
];

console.log(list_mahasiswa);

// destructuring object, ambil value dari key object
const mahasiswa2 = {
    nim: "123332",
    nama: "Alex Santoso",
    umur: 21,
    status: true,
}

const nama = mahasiswa2.nama;
console.log(nama);

const umur = mahasiswa2.umur;
console.log(umur);

if (umur > 21){
    console.log("yee tua")
} else {
    console.log("Umur tidak pantas")
}

// lanjutkan untuk ambil data nim, nama, dan statusnya
// buat tampilan output biodata diri

const mahasiswa3 = {
    nim: "14954",
    nama: "Faisal Rizqi",
    umur: 21,
    status: true,
}

const nim2 = mahasiswa3.nim;
console.log(nim2);

const nama2 = mahasiswa3.nama;
console.log(nama2);

const status2 = mahasiswa3.status;
console.log(status2);

const mahasiswa4 = {
    // key: value
    nim3: "14954",
    nama3: "Faisal Rizqi Nashirudin",
    umur3: 21,
    status3: true,
        matkul: [
            {
                matkulId: "MK001",
                nilai: 89
            },
            {
                matkulId: "MK002",
                nilai: 70
            }
        ]
};

console.log(mahasiswa4);

const { nama, umur, status } = mahasiswa4;

console.log("Nama: " + nama3 + ", Umur: " + umur3);

// literal output, konsep penggabungan variabel dengan string
console.log('Nama: ${nama}, umur: ${umur}');

// array of objects
const listMahasiswa = [
    { nim: "123", nama: "jhon", umur: 18, status:true },
    { nim: "4421", nama: "yanti", umur: 21, status:false },
    { nim: "1231", nama: "phantasm", umur: 24, status:true }
];

// spread, nambah data
const mhs3 = {nim: "21s21", nama: "yuhuu", umur: 20, status:true };

// spread ke array, tambahkan data ke array
const new_listMahasiswa = [
    ...listMahasiswa,
    mhs3
]

// data before 3, data after 4
console.log(new_listMahasiswa);

const ipk = 3.7;

// spread ke object
const new_mhs3 = {
    ...mhs3,
    ipk
};

console.log(new_mhs3);
