import { useParams } from "react-router-dom";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import { mahasiswaList as dummyList } from "@/Data/Dummy";

const MAHASISWA_KEY = "mahasiswaList";

const MahasiswaDetail = () => {
  const { nim } = useParams();

  // Ambil data dari localStorage
  let mahasiswa = null;
  const stored = localStorage.getItem(MAHASISWA_KEY);

  if (stored) {
    const list = JSON.parse(stored);
    mahasiswa = list.find((m) => String(m.nim) === String(nim));
  }

  // fallback ke dummy
  if (!mahasiswa) {
    mahasiswa = dummyList.find((m) => String(m.nim) === String(nim));
  }

  if (!mahasiswa) {
    return <p className="text-red-600">Data mahasiswa tidak ditemukan.</p>;
  }

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">
        Detail Mahasiswa
      </Heading>

      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">NIM</td>
            <td className="py-2 px-4">{mahasiswa.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MahasiswaDetail;