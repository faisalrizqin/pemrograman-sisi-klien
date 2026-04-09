// 1 file, 1 function utama
// 1 function, 1 return
// 1 return, 1 element

// setiap nama function dimulai huruf GEDE

// contoh 1 element
function Contoh(){
    return <h1>Judul Berita</h1>
}

// contoh multiple element
function Contoh2(){
    return <div>
        <h1>Judul Berita</h1>
        <p>Isi berita yg panjang</p>
    </div>
}

function Judul({}){
    return <h1>Berita {nama}</h1>
}

function Isi(){
    return <span>Berita paling nyoss minggu ini</span>
}

function Artikel({ nama }){
    return <div>
        <Judul nama={nama}/>
        <Isi />
    </div>
}

/* function Nama( { nama } ){
    return <h3>Nama: {nama}</h3>
}

function Nim( { nim }){
    return <h3>NIM: {nim}</h3>
} */

function Mhs(){
    const mahasiswa = {
        nama: "Rohman Wingchun",
        nim: "A11.2012.06543"
    }

    return <div>
        <Nama nama={mahasiswa.nama} />
        <Nim nim={mahasiswa.nim}/>
    </div>
}

// komponen untuk nama
function Nama(props) {
    return <p>Nama: {props.nama}</p>;
}

// komponen untuk nim
function Nim(props) {
    return <p>NIM: {props.nim}</p>;
}

function ListMhs() {
    const listMahasiswa = [
        { nama: "faisal", nim: 14954 },
        { nama: "iqbal", nim: 14969 },
        { nama: "lana", nim: 14999 }
    ];

    return (
        <div>
            {listMahasiswa.map((mhs, index) => (
                <div key={index}>
                    <Nama nama={mhs.nama} />
                    <Nim nim={mhs.nim} />
                </div>
            ))}
        </div>
    );
}

// function utama
function App() {
    return (
        <div>
            <ListMhs />
        </div>
    );
}

export default App;