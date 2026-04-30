import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mahasiswaList as dummyList } from "@/Data/Dummy";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Button from "@/Pages/Admin/Components/Button";

import MahasiswaTable from "./Components/MahasiswaTable";
import MahasiswaModal from "./Components/MahasiswaModal";

import {
  confirmDelete,
  confirmUpdate,
} from "@/Utils/Helpers/SwalHelpers";
import {
  toastSuccess,
  toastError,
} from "@/Utils/Helpers/ToastHelpers";

const MAHASISWA_KEY = "mahasiswaList";

const Mahasiswa = () => {
  const navigate = useNavigate();

  // ================= INIT DATA =================
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

  // ================= SYNC =================
  useEffect(() => {
    localStorage.setItem(MAHASISWA_KEY, JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  // ================= CRUD =================
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

  // ================= MODAL CONTROL =================
  const openAddModal = () => {
    setForm({ nim: "", nama: "", status: true });
    setIsEdit(false); // 🔥 FIX UTAMA
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setForm(mhs);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // ================= FORM =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(() => {
        updateMahasiswa(form.nim, form);
        toastSuccess("Data berhasil diperbarui");
        setForm({ nim: "", nama: "", status: true });
        setIsEdit(false);
        setIsModalOpen(false);
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);

      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }

      addMahasiswa(form);
      toastSuccess("Data berhasil ditambahkan");
      setForm({ nim: "", nama: "", status: true });
      setIsModalOpen(false);
    }
  };

  const handleDelete = (nim) => {
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  // ================= RENDER =================
  return (
    <>
      <Card>
        <div className="flex justify-between mb-4">
          <Heading as="h2">Daftar Mahasiswa</Heading>

          {/* ✅ FIXED BUTTON */}
          <Button onClick={openAddModal}>
            + Tambah
          </Button>
        </div>

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