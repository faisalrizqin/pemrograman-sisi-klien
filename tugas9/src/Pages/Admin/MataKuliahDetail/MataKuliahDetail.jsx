import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMataKuliah } from "@/Utils/Apis/MataKuliahApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MataKuliahDetail = () => {
  const { id } = useParams();
  const [mataKuliah, setMataKuliah] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMataKuliah();
  }, [id]);

  const fetchMataKuliah = async () => {
    try {
      const res = await getMataKuliah(id);
      setMataKuliah(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mata kuliah");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Memuat data...</p>;

  if (!mataKuliah) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Mata Kuliah</Heading>
      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">Kode</td>
            <td className="py-2 px-4">{mataKuliah.kode}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mataKuliah.nama}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">SKS</td>
            <td className="py-2 px-4">{mataKuliah.sks}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Semester</td>
            <td className="py-2 px-4">{mataKuliah.semester}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MataKuliahDetail;
