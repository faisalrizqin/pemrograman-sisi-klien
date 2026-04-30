import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList as dummyList } from "@/Data/Dummy";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import MahasiswaTable from "./Components/MahasiswaTable";
import MahasiswaModal from "./Components/MahasiswaModal";

const MAHASISWA_KEY = "mahasiswaList";

const Mahasiswa = () => {
  const navigate = useNavigate();

  const getInitialData = () => {
    const stored = localStorage.getItem(MAHASISWA_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(MAHASISWA_KEY, JSON.stringify(dummyList));
    return dummyList;
  };

  const [mahasiswa, setMahasiswa] = useState(() => getInitialData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ nim: "", nama: "", status: true });

  useEffect(() => {
    localStorage.setItem(MAHASISWA_KEY, JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  const addMahasiswa = (data) => {
    setMahasiswa((prev) => [...prev, data]);
  };

  const updateMahasiswa = (nim, data) => {
    setMahasiswa((prev) =>
      prev.map((m) =>
        String(m.nim) === String(nim) ? { ...m, ...data } : m
      )
    );
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) =>
      prev.filter((m) => String(m.nim) !== String(nim))
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      alert("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      updateMahasiswa(form.nim, form);
    } else {
      const exists = mahasiswa.find(
        (m) => String(m.nim) === String(form.nim)
      );
      if (exists) {
        alert("NIM sudah ada!");
        return;
      }
      addMahasiswa(form);
    }

    setForm({ nim: "", nama: "", status: true });
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleEdit = (mhs) => {
    setForm(mhs);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (nim) => {
    if (window.confirm("Yakin hapus?")) deleteMahasiswa(nim);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between mb-4">
          <Heading as="h2">Daftar Mahasiswa</Heading>
          <Button onClick={() => setIsModalOpen(true)}>
            + Tambah
          </Button>
        </div>

        {/* ✅ kirim ke child */}
        <MahasiswaTable
          data={mahasiswa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
        />
      </Card>

      <MahasiswaModal
        isOpen={isModalOpen}
        form={form}
        isEdit={isEdit}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Mahasiswa;